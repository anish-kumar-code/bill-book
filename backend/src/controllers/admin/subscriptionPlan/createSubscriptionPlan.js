const SubscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");

exports.createSubscriptionPlan = catchAsync(async (req, res) => {
    try {
        const { name, duration_days, price, adminAccount, staffAccount, isActive } = req.body;

        const newPlan = await SubscriptionPlan.create({
            name,
            duration_days,
            price,
            adminAccount,
            staffAccount,
            isActive
        });

        return res.status(201).json({
            status: true,
            message: "Subscription plan created successfully",
            data: newPlan
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});