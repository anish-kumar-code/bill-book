const Setting = require("../../../models/setting");

exports.updateLogo = async (req, res) => {
    try {
        if (!req.files || !req.files.logo || !req.files.logo[0]) {
            return res.status(400).json({ message: "Logo file is required" });
        }

        const logoPath = `${req.files.logo[0].destination}/${req.files.logo[0].filename}`;

        const setting = await Setting.findOneAndUpdate({}, { logo: logoPath }, {
            new: true,
            runValidators: true
        });

        if (!setting) return res.status(404).json({ message: "Setting not found" });

        res.status(200).json({
            success: true,
            message: "Logo updated successfully",
            logo: setting.logo
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
