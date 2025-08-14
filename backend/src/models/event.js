const mongoose = require("mongoose");

const enventSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    date: { type: String, default: "" },
    place: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", enventSchema);
