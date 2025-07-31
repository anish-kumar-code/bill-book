const planHistory = require("../../../models/planHistory");
const subscriptionPlan = require("../../../models/subscriptionPlan");
const catchAsync = require("../../../utils/catchAsync");

exports.getSubscriptionHistory = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const plansHistory = await planHistory.find({ userId })

    return res.status(200).json({
        status: true,
        message: "Plans fetched successfully",
        data: plansHistory || [],
    });
});
