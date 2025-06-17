const Setting = require("../../../models/setting");

exports.getHomeData = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) return res.status(404).json({ message: "Setting not found" });
        const homeData = {
            logo: setting.logo,
            favicon: setting.favicon,
            adminCard: setting.adminCard.isActive ? setting.adminCard : null,
        };

        res.status(200).json({
            success: true,
            message: "Home Data fetched successfully",
            homeData
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
