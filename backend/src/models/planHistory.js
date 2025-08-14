const mongoose = require("mongoose");
const planHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
    paymentId: String,
    amount: Number,
    paymentStatus: String
});

module.exports = mongoose.model("PlanHistory", planHistorySchema);
