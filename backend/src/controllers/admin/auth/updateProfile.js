const Admin = require("../../../models/admin");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");

exports.updateProfile = catchAsync(async (req, res, next) => {
    const adminId = req.user._id;

    const allowedFields = ["name", "email", "mobile_no", "address", "bio"];
    const updates = {};

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    });

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
        new: true,
        runValidators: true,
    });

    if (!updatedAdmin) {
        return next(new AppError("Admin not found", 404));
    }

    res.status(200).json({
        status: true,
        message: "Admin profile updated successfully",
        data: updatedAdmin,
    });
});
