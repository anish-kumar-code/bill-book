
const enquiry = require("../../../models/enquiry");
const catchAsync = require("../../../utils/catchAsync");

exports.addEnquiry = catchAsync(async (req, res) => {
    try {
        let { category, name, mobileNo, email, collegeName } = req.body

        const newEnquiry = new enquiry({ category, name, mobileNo, email, collegeName })
        await newEnquiry.save()

        return res.status(201).json({
            status: true,
            message: "Enquiry Added",
            data: { newEnquiry }
        })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
})