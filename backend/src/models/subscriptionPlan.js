const mongoose = require("mongoose");
const subscriptionPlanSchema = new mongoose.Schema({
    name: String,
    duration_days: Number,
    price: Number,
    features: [String],
    isActive: Boolean
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);