const SubscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");

exports.getSubscriptionPlan = catchAsync(async (req, res) => {
    try {
        const { id } = req.query;

        let plans;
        if (id) {
            plans = await SubscriptionPlan.findById(id);
            if (!plans) {
                return res.status(404).json({ status: false, message: "Subscription plan not found" });
            }
        } else {
            plans = await SubscriptionPlan.find();
        }

        return res.status(200).json({
            status: true,
            message: id ? "Subscription plan fetched successfully" : "All subscription plans fetched successfully",
            data: plans
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});