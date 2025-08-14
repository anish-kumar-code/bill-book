const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");

exports.getList = catchAsync(async (req, res) => {
    try {

        const users = await User.find()

        return res.status(200).json({
            status: true,
            message: "Dashboard data fetched successfully",
            data: {
                users
            }
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});