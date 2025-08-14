const enquiry = require("../../../models/enquiry");
const catchAsync = require("../../../utils/catchAsync");


exports.getEnquiry = catchAsync(async (req, res) => {
    try {
        const newEnquiry = await enquiry.find();

        return res.status(201).json({
            status: true,
            message: "Enquiry Fetched",
            data: { newEnquiry }
        })
        
    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
})