const planHistory = require("../../../models/planHistory");
const subscriptionPlan = require("../../../models/subscriptionPlan");
const User = require("../../../models/user");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.takeSubscription = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    let { subscriptionId, paymentId, paymentStatus } = req.body

    // Here you would typically handle the logic to take a subscription
    const subscription = await subscriptionPlan.findById(subscriptionId);
    if (!subscription) return next(new AppError("Subscription plan not found", 404));

    const user = await User.findById(userId);
    if (!user) return next(new AppError("User not found", 404));

    // Logic to create a new subscription for the user
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (subscription.duration_days * 24 * 60 * 60 * 1000)); // Add days in milliseconds

    const newSubscription = await planHistory.create({
        userId: userId,
        planId: subscription._id,
        planName: subscription.name,
        startDate: startDate,
        endDate: endDate,
        isActive: true,
        paymentId: paymentId,
        amount: subscription.price,
        paymentStatus: paymentStatus
    })

    user.subscribed = true;
    user.subscription_plan_id = subscription._id;
    user.plan_expiry = endDate;

    await newSubscription.save();
    await user.save();

    return res.status(200).json({
        status: true,
        message: "Your subscription has been taken successfully",
        data: newSubscription
    });
});
