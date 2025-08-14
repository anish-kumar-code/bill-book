const jwt = require("jsonwebtoken");
const catchAsync = require("../../../../utils/catchAsync");
const AppError = require("../../../../utils/AppError");
const college = require("../../../../models/college");

exports.collegeAuthenticate = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookie?.xcvbexamstons) {
        token = req.cookie?.xcvbexamstons;
    }

    if (!token) return next(new AppError("You are not loggedin.", 404));

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const newCollege = await college.findById(decoded.id);
    if (!newCollege) return next(new AppError("College not exist.", 404));

    req.newCollege = newCollege;
    next()

})