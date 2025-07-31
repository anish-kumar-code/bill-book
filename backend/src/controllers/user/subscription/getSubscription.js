const banner = require("../../../models/banner");
const subscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");

exports.getSubscription = catchAsync(async (req, res) => {
    const plans = await subscriptionPlan.find({ isActive: true });

    return res.status(200).json({
        status: true,
        message: "Plans fetched successfully",
        data: plans || [],
    });
});
