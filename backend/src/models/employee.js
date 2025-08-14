const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    address: { type: String, default: "" },
    employeeNo: { type: String, default: "" },
    collegeCount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Employee", employeeSchema);
