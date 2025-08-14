const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.ObjectId, ref: "Event", required: true },
    collegeId: { type: mongoose.Schema.ObjectId, ref: "College", required: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    numberOfEmployee: { type: String, default: "" },
    ticketNo: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);
