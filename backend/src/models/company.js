const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: "" },
    logo: { type: String, default: "" },
    sign: { type: String, default: "" },
    tagline: { type: String, default: "" },
    gstNo: { type: String, default: "" },
    pan: { type: String, default: "" },
    email: { type: String, default: "" },
    contactNumbers: { type: [String], default: [] },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    website: { type: String, default: "" }, 
    bankDetails: {
        accountHolderName: { type: String, default: "" },
        bankName: { type: String, default: "" },
        accountNo: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        branch: { type: String, default: "" },
        upiIds: { type: [String], default: [] }
    }
});


module.exports = mongoose.model("Company", companySchema);