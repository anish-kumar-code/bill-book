const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");


exports.getUser = catchAsync(async (req, res) => {
    try {

        const { type } = req.query;

        let query = {};
        if (type) {
            if (type === "active") {
                query = { status: "active" };
            } else if (type === "inactive") {
                query = { status: "inactive" };
            } else if (type === "paid") {
                query = { subscribed: true }
            } else if (type === "unpaid") {
                query = { subscribed: false }
            } else if (type === "new") {
                const today = new Date();
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);

                query = {
                    createdAt: {
                        $gte: thirtyDaysAgo,
                        $lte: today
                    }
                };
            } else if (type === "all") {
                query = {}
            } else {
                query = {}
            }
        }

        const users = await User.find(query)

        console.log(type)
        console.log(users)

        return res.status(200).json({
            status: true,
            message: "user data fetched successfully",
            data: {
                users,
            }
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});