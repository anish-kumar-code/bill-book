const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    collegeName: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    collegeCode: { type: String, default: "" },
    collegeLogo: { type: String, default: "" },
    collegeId: { type: String, default: "" },
    collegeIdUnique: { type: String, default: "" },

    certificate: { type: String, default: "" },
    certificateName: { type: String, default: "" },
    certificateNo: { type: String, default: "" },

    status: { type: String, enum: ["profilePending", "profileCompleted", "active", "inactive"], default: "profilePending" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certificateSchema);
