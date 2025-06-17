const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "", unique: true },
    mobileNo: { type: String, default: "" },
    password: { type: String, default: "" },
    address: { type: String, default: "" },
    bio: { type: String, default: "" },
    role: { type: String, enum: ["superadmin", "admin", "manager", "support"], default: "admin" },
    lastLogin: { type: Date, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now }
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
