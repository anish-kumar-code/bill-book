const Admin = require("../../../models/admin");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const createToken = require("../../../utils/createToken");

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and password are required.", 400));
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return next(new AppError("Invalid email or password.", 401));

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return next(new AppError("Invalid email or password.", 401));

    // Optional: Update last login time
    admin.lastLogin = new Date();
    await admin.save();

    createToken(admin, 200, res); // Should send token and admin details
});
