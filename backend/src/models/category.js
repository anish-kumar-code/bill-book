const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
    status: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Category", categorySchema);