const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    company: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    otp: { code: { type: String, default: "" }, expiresAt: { type: Date, default: null } },
    lastLogin: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    deviceInfo: { deviceId: { type: String, default: "" }, deviceModel: { type: String, default: "" }, osVersion: { type: String, default: "" } },
    isNewUser: { type: Boolean, default: true },
    referralCode: {type: String, default: ""},
    subscribed: { type: Boolean, default: false },
    subscription_plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan", default: null },
    plan_expiry: { type: Date, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
