const SubscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");


exports.deleteSubscriptionPlan = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlan = await SubscriptionPlan.findByIdAndDelete(id);

        if (!deletedPlan) {
            return res.status(404).json({ status: false, message: "Subscription plan not found" });
        }

        return res.status(200).json({
            status: true,
            message: "Subscription plan deleted successfully",
            data: null
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});