// const College = require("../../../models/college");
// const AppError = require("../../../utils/AppError");
// const catchAsync = require("../../../utils/catchAsync");

// exports.updateCollege = catchAsync(async (req, res, next) => {
//     const collegeId = req.params.collegeId
//     const updateData = req.body;

//     const college = await College.findById(collegeId);
//     if (!college) { 
//         return next(new AppError("College not found", 404));
//     }

//     // Handle image uploads
//     if (req.files && req.files.collegeLogo && req.files.collegeLogo.length > 0) {
//         const uploadedPath = `${req.files.collegeLogo[0].destination}/${req.files.collegeLogo[0].filename}`;
//         college.collegeLogo = uploadedPath;
//     }

//     if (req.files && req.files.directorImage && req.files.directorImage.length > 0) {
//         const uploadedPath = `${req.files.directorImage[0].destination}/${req.files.directorImage[0].filename}`;
//         college.directorImage = uploadedPath;
//     }

//     if (req.files && req.files.aboutImage && req.files.aboutImage.length > 0) {
//         const uploadedPath = `${req.files.aboutImage[0].destination}/${req.files.aboutImage[0].filename}`;
//         college.aboutUsImage = uploadedPath;
//     }

//     if (req.files && req.files.registrationImage && req.files.registrationImage.length > 0) {
//         const uploadedPath = `${req.files.registrationImage[0].destination}/${req.files.registrationImage[0].filename}`;
//         college.registrationImage = uploadedPath;
//     }

//     // List of allowed fields to update
//     const allowedFields = [
//         "name", "email", "mobileNo", "collegeName", "category", "collegeCode",
//         "address", "city", "state", "pincode", "website", "contactPerson",
//         "aboutUs", "directorName", "directorMessage", "libraryDescription",
//         "admissionProcess", "feeStructure"
//     ];

//     allowedFields.forEach(field => {
//         if (updateData[field] !== undefined) {
//             college[field] = updateData[field];
//         }
//     });

//     // Optional: mark profile as completed if basic info filled
//     if (college.name && college.collegeName && college.collegeLogo) {
//         college.status = "profileCompleted";
//     }

//     await college.save();

//     res.status(200).json({
//         status: true,
//         message: "College profile updated successfully",
//         data: college
//     });
// });
// -----------------------------------------------------------------------
const College = require("../../../models/college");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.updateCollege = catchAsync(async (req, res, next) => {
    const { collegeId } = req.params;
    const updateData = req.body;

    // Find the college
    const college = await College.findById(collegeId);
    if (!college) {
        return next(new AppError("College not found", 404));
    }

    // Handle single image fields
    const singleImageFields = {
        collegeLogo: "collegeLogo",
        directorImage: "directorImage",
        aboutUsImage: "aboutUsImage",
        registrationImage: "registrationImage"
    };

    Object.entries(singleImageFields).forEach(([fileKey, dbField]) => {
        if (req.files?.[fileKey]?.length > 0) {
            const file = req.files[fileKey][0];
            college[dbField] = `${file.destination}/${file.filename}`;
        }
    });

    // Handle multiple image uploads
    const multiImageFields = [
        "galleryImages",
        "classroomImages",
        "libraryImages",
        "labImages",
        "sportsImages",
        "hostelImages",
        "cafeteriaImages"
    ];

    multiImageFields.forEach(field => {
        if (req.files?.[field]?.length > 0) {
            const uploadedPaths = req.files[field].map(file => `${file.destination}/${file.filename}`);
            college[field] = uploadedPaths;
        }
    });

    // Merge all fields from req.body into the college document (including nested)
    Object.keys(updateData).forEach(key => {
        if (typeof updateData[key] === "object" && !Array.isArray(updateData[key]) && updateData[key] !== null) {
            // Merge nested objects
            college[key] = {
                ...college[key],
                ...updateData[key]
            };
        } else {
            // Direct assignment
            college[key] = updateData[key];
        }
    });

    // Auto-update status if essential fields are present
    if (college.name && college.collegeName && college.collegeLogo) {
        college.status = "profileCompleted";
    }

    await college.save();

    res.status(200).json({
        status: true,
        message: "College profile updated successfully",
        data: college
    });
});
