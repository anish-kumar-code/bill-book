const Setting = require("../../../models/setting");

exports.deleteSetting = async (req, res) => {
    try {
        const setting = await Setting.findOneAndDelete();
        if (!setting) return res.status(404).json({ message: "Setting not found" });
        res.json({ message: "Setting deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};