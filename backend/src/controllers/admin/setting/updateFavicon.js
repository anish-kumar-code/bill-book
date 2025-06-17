const Setting = require("../../../models/setting");

exports.updateFavicon = async (req, res) => {
    try {
        if (!req.files || !req.files.favicon || !req.files.favicon[0]) {
            return res.status(400).json({ message: "Favicon file is required" });
        }

        const faviconPath = `${req.files.favicon[0].destination}/${req.files.favicon[0].filename}`;

        const setting = await Setting.findOneAndUpdate({}, { favicon: faviconPath }, {
            new: true,
            runValidators: true
        });

        if (!setting) return res.status(404).json({ message: "Setting not found" });

        res.status(200).json({
            success: true,
            message: "Favicon updated successfully",
            favicon: setting.favicon
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
