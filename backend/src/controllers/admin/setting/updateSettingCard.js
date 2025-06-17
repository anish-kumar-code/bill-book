const Setting = require("../../../models/setting");

exports.updateSettingCard = async (req, res) => {
    try {
        const { title, description, isActive } = req.body;
        let updateData = {};

        // If image is uploaded
        if (req.files && req.files.image && req.files.image[0]) {
            const imagePath = `${req.files.image[0].destination}/${req.files.image[0].filename}`;
            updateData["adminCard.image"] = imagePath;
        }

        // Update other fields if provided
        if (title !== undefined) updateData["adminCard.title"] = title;
        if (description !== undefined) updateData["adminCard.description"] = description;
        if (isActive !== undefined) updateData["adminCard.isActive"] = isActive;

        const setting = await Setting.findOneAndUpdate({}, { $set: updateData }, {
            new: true,
            runValidators: true
        });

        if (!setting) return res.status(404).json({ message: "Setting not found" });

        res.status(200).json({
            success: true,
            message: "Admin card updated successfully",
            adminCard: setting.adminCard
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
