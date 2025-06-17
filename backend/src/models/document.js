const mongoose = require("mongoose");
const documentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    type: { type: String, enum: ["quotation", "invoice"] },
    customer_details: {
        name: String,
        contact: String,
        address: String,
        email: String
    },
    items: [
        {
            description: String,
            quantity: Number,
            rate: Number,
            total: Number
        }
    ],
    subtotal: Number,
    tax_percent: Number,
    tax_amount: Number,
    total_amount: Number,
    notes: String,
    terms: String,
    watermark_applied: Boolean,
    generated_pdf_url: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Document", documentSchema);