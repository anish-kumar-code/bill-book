const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Full form stored as raw JSON (from collapsible sections)
    formData: {
        type: Object,
        required: true,
        default: {}
    },
    status: {
        type: String,
        enum: ["draft", "submitted", "approved", "rejected"],
        default: "draft"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Bill", billSchema);
