const mongoose = require("mongoose");
const planHistorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
    start_date: Date,
    end_date: Date,
    isActive: Boolean,
    payment_id: String,
    payment_status: String
});

module.exports = mongoose.model("PlanHistory", planHistorySchema);
