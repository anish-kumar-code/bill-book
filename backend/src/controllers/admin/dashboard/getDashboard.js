const college = require("../../../models/college");
const enquiry = require("../../../models/enquiry");
const catchAsync = require("../../../utils/catchAsync");


exports.getDashboard = catchAsync(async (req, res) => {
    try {

        const collegeCount = await college.countDocuments();
        const enquiryCount = await enquiry.countDocuments({ status: "active" });

        return res.status(200).json({
            status: true,
            message: "College fetched successfully",
            data: { collegeCount, enquiryCount }
        })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
})