const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    name: { type: String, default: "" },
    collegeName: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    category: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", enquirySchema);
