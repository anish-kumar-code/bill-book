const Setting = require("../../../models/setting");

exports.updateSetting = async (req, res) => {
    try {
        const setting = await Setting.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true
        });
        if (!setting) return res.status(404).json({ message: "Setting not found" });
        res.json(setting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};