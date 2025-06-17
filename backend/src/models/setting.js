const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    // General App/Company Info
    appName: { type: String, default: "MyApp" },
    logo: { type: String, default: "" }, // URL or path
    favicon: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    supportEmail: { type: String, default: "" },
    supportContact: { type: String, default: "" },

    // Admin Business Card
    adminCard: {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        isActive: { type: Boolean, default: false }
    },

    // Payment Gateway Keys
    paymentKeys: {
        keyId: { type: String, default: "" },
        keySecret: { type: String, default: "" }
    },

    // Google Map or other third-party service keys
    thirdPartyKeys: {
        googleMapApiKey: { type: String, default: "" },
        firebaseServerKey: { type: String, default: "" }
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Setting", settingSchema);
