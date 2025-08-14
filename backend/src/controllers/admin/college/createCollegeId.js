const College = require("../../../models/college");
const Enquiry = require("../../../models/enquiry");
const catchAsync = require("../../../utils/catchAsync");

const generateUniqueCollegeId = async () => {
    const min = 100000000;
    const max = 999999999;

    let isUnique = false;
    let collegeIdUnique;

    while (!isUnique) {
        collegeIdUnique = Math.floor(Math.random() * (max - min + 1)) + min;
        const exists = await College.findOne({ collegeIdUnique });

        if (!exists) {
            isUnique = true;
        }
    }

    return collegeIdUnique;
};

exports.createCollegeId = catchAsync(async (req, res) => {
    try {
        const { collegeId, password, enqId } = req.body;

        if (!collegeId || !password) {
            return res.status(400).json({ status: false, message: "College Id and Password are required" });
        }

        const oldCollege = await College.findOne({ collegeId });
        if (oldCollege) {
            return res.status(400).json({ status: false, message: "College Id already exists" });
        }

        let name = "", collegeName = "", email = "", mobileNo = "", category = "";

        if (enqId) {
            const enquiryData = await Enquiry.findById(enqId);
            if (!enquiryData) {
                return res.status(404).json({ status: false, message: "Enquiry not found" });
            }

            name = enquiryData.name || "";
            collegeName = enquiryData.collegeName || "";
            email = enquiryData.email || "";
            mobileNo = enquiryData.mobileNo || "";
            category = enquiryData.category || "";

            enquiryData.status = "inactive";
            await enquiryData.save();
        }

        let savedCollege = null;
        const MAX_RETRIES = 5;
        let attempts = 0;

        while (!savedCollege && attempts < MAX_RETRIES) {
            try {
                const collegeIdUnique = await generateUniqueCollegeId();

                const newCollege = new College({
                    name,
                    collegeName,
                    email,
                    mobileNo,
                    category,
                    collegeId,
                    password,
                    collegeIdUnique
                });

                savedCollege = await newCollege.save();
            } catch (err) {
                if (err.code === 11000 && err.keyPattern?.collegeIdUnique) {
                    // Duplicate collegeIdUnique - retry
                    attempts++;
                } else {
                    throw err;
                }
            }
        }

        if (!savedCollege) {
            return res.status(500).json({ status: false, message: "Failed to generate unique College ID. Please try again." });
        }

        return res.status(201).json({
            status: true,
            message: "College Added",
            data: savedCollege
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});



// exports.createCollegeId = catchAsync(async (req, res) => {
//     try {
//         const { collegeId, password, enqId } = req.body;
//         // console.log("createCollegeId", req.body);

//         if (!collegeId || !password) {
//             return res.status(400).json({ status: false, message: "College Id and Password are required" });
//         }

//         const oldCollege = await College.findOne({ collegeId });
//         if (oldCollege) {
//             return res.status(400).json({ status: false, message: "College Id already exists" });
//         }

//         let name = "", collegeName = "", email = "", mobileNo = "", category = "";

//         if (enqId) {
//             const enquiryData = await Enquiry.findById(enqId);
//             if (!enquiryData) {
//                 return res.status(404).json({ status: false, message: "Enquiry not found" });
//             }

//             name = enquiryData.name || "";
//             collegeName = enquiryData.collegeName || "";
//             email = enquiryData.email || "";
//             mobileNo = enquiryData.mobileNo || "";
//             category = enquiryData.category || "";

//             enquiryData.status = "inactive";
//             await enquiryData.save();
//         }

//         const collegeIdUnique = await generateUniqueCollegeId();

//         const newCollege = new College({
//             name,
//             collegeName,
//             email,
//             mobileNo,
//             category,
//             collegeId,
//             password,
//             collegeIdUnique
//         });

//         await newCollege.save();

//         return res.status(201).json({
//             status: true,
//             message: "College Added",
//             data: newCollege
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
//     }
// });
