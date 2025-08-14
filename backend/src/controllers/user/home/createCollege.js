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

exports.createCollege = catchAsync(async (req, res) => {
    try {
        const userId = req.user._id;
        // console.log(req.user)

        const { collegeName, email, mobileNo, category, website, description, state, district } = req.body;

        // if (!collegeId || !password) {
        //     return res.status(400).json({ status: false, message: "College Id and Password are required" });
        // }

        // const oldCollege = await College.findOne({ collegeId });
        // if (oldCollege) {
        //     return res.status(400).json({ status: false, message: "College Id already exists" });
        // }

        let savedCollege = null;
        const MAX_RETRIES = 5;
        let attempts = 0;

        while (!savedCollege && attempts < MAX_RETRIES) {
            try {
                const collegeIdUnique = await generateUniqueCollegeId();

                const newCollege = new College({
                    employeeId: userId,
                    collegeName,
                    email,
                    mobileNo,
                    category,
                    collegeIdUnique,
                    website,
                    description,
                    state,
                    district
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

