const Admin = require("../../../models/admin");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, mobileNo, password, address, bio } = req.body;

    if (!name || !email || !password)
        return next(new AppError("Name, email, and password are required", 400));

    const existing = await Admin.findOne({ email });
    if (existing) return next(new AppError("Admin with this email already exists", 409));
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, mobileNo, password: hashPassword, address, bio });
    await admin.save();

    return res.status(201).json({
        status: true,
        message: "Admin account created successfully",
        data: { admin }
    });
});
