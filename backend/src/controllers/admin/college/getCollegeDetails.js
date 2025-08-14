const college = require("../../../models/college");
const catchAsync = require("../../../utils/catchAsync");


exports.getCollegeDetails = catchAsync(async (req, res) => {
    try {

        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ status: false, message: "College ID is required" });
        }

        const collegeDetails = await college.findById(id);
        if (!collegeDetails) {
            return res.status(404).json({ status: false, message: "No college found" });
        }

        return res.status(200).json({
            status: true,
            message: "College data fetched successfully",
            data: { collegeDetails }
        })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
})