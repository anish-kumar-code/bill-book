const Setting = require("../../../models/setting");

exports.getSetting = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) return res.status(404).json({ message: "Setting not found" });
        res.json(setting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};