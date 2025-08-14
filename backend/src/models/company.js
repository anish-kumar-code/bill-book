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
    whatsappNumber: { type: String, default: "" },
    contactNumber1: { type: String, default: "" },
    contactNumber2: { type: String, default: "" },
    contactNumber3: { type: String, default: "" },
    contactNumber4: { type: String, default: "" },
    landlineNumber: { type: String, default: "" },
    tollFreeNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    jurisdiction: { type: String, default: "" },
    website: { type: String, default: "" },
    bankDetails: {
        accountHolderName: { type: String, default: "" },
        bankName: { type: String, default: "" },
        accountNo: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        branch: { type: String, default: "" },
    },
    upiDetails: {
        upiId1: { type: String, default: "" },
        upiId2: { type: String, default: "" },
        phonePeNumber: { type: String, default: "" },
        googlePayNumber: { type: String, default: "" },
    },
    otherDetails: {
        affiliatedBy: { type: String, default: "" },
        isoCertificateDetails: { type: String, default: "" },
        govtRegNo: { type: String, default: "" },
    }
});


module.exports = mongoose.model("Company", companySchema);