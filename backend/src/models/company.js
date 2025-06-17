const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    logo: String,
    sign: String,
    tagline: String,
    gst_no: String,
    pan: String,
    email: String,
    contact_numbers: [String],
    address: String,
    city: String,
    state: String,
    website: String,
    bank_details: {
        account_holder_name: String,
        bank_name: String,
        account_no: String,
        ifsc_code: String,
        branch: String,
        upi_ids: [String]
    }
});

module.exports = mongoose.model("Company", companySchema);