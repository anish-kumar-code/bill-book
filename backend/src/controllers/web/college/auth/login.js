const college = require("../../../../models/college");
const AppError = require("../../../../utils/AppError");
const catchAsync = require("../../../../utils/catchAsync");
const createToken = require("../../../../utils/createToken");

exports.login = catchAsync(async (req, res, next) => {
    const { collegeId, password } = req.body;

    if (!collegeId || !password) {
        return next(new AppError("collegeId and password are required.", 400));
    }

    const oldCollege = await college.findOne({ collegeId });
    if (!oldCollege) return next(new AppError("Invalid collegeId or password.", 401));

    // check password
    const isMatch = oldCollege.password == password;
    if (!isMatch) return next(new AppError("Invalid collegeId or password.", 401));


    createToken(oldCollege, 200, res); // Should send token and admin details
});
