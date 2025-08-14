const college = require("../../../models/college");
const catchAsync = require("../../../utils/catchAsync");

exports.getCollegeList = catchAsync(async (req, res) => {

    try {
        const collegeList = await college.find().sort({ createdAt: -1 });
        if (!collegeList || collegeList.length === 0) {
            return res.status(404).json({ status: false, message: "No colleges found" });
        }
        return res.status(200).json({
            status: true,
            message: "College fetched successfully",
            count: collegeList.length,
            collegeList
        })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
})