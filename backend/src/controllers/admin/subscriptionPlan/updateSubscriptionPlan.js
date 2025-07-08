const SubscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");


exports.updateSubscriptionPlan = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration_days, price, adminAccount, staffAccount, isActive } = req.body;

        const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
            id,
            { name, duration_days, price, adminAccount, staffAccount, isActive },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ status: false, message: "Subscription plan not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Subscription plan updated successfully",
            data: updatedPlan
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});