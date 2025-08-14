const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }
        const userData = req.body;
        const users = await User.findByIdAndUpdate(userId, userData, { new: true });

        return res.status(200).json({
            status: true,
            message: "User update successfully",
            data: {
                users
            }
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});