const Setting = require("../../../models/setting");

exports.getHomeData = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Home Data fetched successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
