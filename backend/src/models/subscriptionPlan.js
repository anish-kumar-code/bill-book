const mongoose = require("mongoose");
const subscriptionPlanSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "Basic Plan" },
    duration_days: { type: Number, default: 30 },
    price: { type: Number, default: 0 },
    adminAccount: { type: Number, default: 1 },
    staffAccount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);


// features: {
//         type: Map,
//         of: Boolean,
//         default: {
//             "invoice": true,
//             "quotation": true,
//             "bill": true,
//             "money_receipt": true,
//             "proforma_invoice": true,
//             "voucher": true,
//             "packing_list": true,
//             "survey": true,
//             "lr": true
//         }
//     },