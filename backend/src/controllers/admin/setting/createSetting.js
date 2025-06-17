const Setting = require("../../../models/setting");
const catchAsync = require("../../../utils/catchAsync");

exports.createSetting = catchAsync(async (req, res) => {
    try {
        const existing = await Setting.findOne();
        if (existing) return res.status(400).json({ message: "Setting already exists" });
        console.log(req.body)
        const setting = new Setting(req.body);
        await setting.save();
        res.status(201).json(setting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});