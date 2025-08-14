const College = require("../../../models/college");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.uploadGalleryImage = catchAsync(async (req, res, next) => {
    const collegeId = req.newCollege._id;

    const college = await College.findById(collegeId);
    if (!college) {
        return next(new AppError("College not found", 404));
    }

    // Handle gallery image uploads
    if (req.files && req.files.gallery && req.files.gallery.length > 0) {
        const uploadedPaths = req.files.gallery.map(file => `${file.destination}/${file.filename}`);
        college.galleryImages = [...college.galleryImages, ...uploadedPaths]; // append new images
    }

    await college.save();

    res.status(200).json({
        status: true,
        message: "Gallery images uploaded successfully",
        data: college.galleryImages
    });
});
