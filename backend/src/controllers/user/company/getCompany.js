
const Company = require("../../../models/company");
const catchAsync = require("../../../utils/catchAsync");

exports.getCompany = catchAsync(async (req, res) => {
    try {
        const userId = req.user._id; // assuming user is authenticated

        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        const company = await Company.findOne({ userId });

        if (!company) {
            return res.status(404).json({
                status: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Company fetched successfully",
            data: company
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});
