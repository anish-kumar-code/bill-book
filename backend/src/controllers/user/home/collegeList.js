const college = require("../../../models/college");

exports.getCollegeList = async (req, res) => {
    try {
        const userId = req.user._id;

        const collegeList = await college.find({employeeId: userId}).sort({createdAt: -1})

        let transformedCollegeList = collegeList.map(col => {
            return {
                _id: col._id,
                collegeName: col.collegeName || "",
                collegeLogo: col.collegeLogo || "",
                collegeIdUnique: col.collegeIdUnique || "",
                email: col.email || "",
                mobileNo: col.mobileNo || "",
                callStatus: col.callStatus || false,
            }
        })

        res.status(200).json({
            success: true,
            message: "College data fetched successfully",
            transformedCollegeList
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
