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
//         "admissionProcess", "feeStructure", "callStatus", "callDescription"
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

// ------------------------------------------------------------------------
const College = require("../../../models/college");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const _ = require("lodash"); // You may need to run: npm install lodash

exports.updateCollege = catchAsync(async (req, res, next) => {
    const collegeId = req.params.collegeId;
    const updateData = req.body;
    const files = req.files;

    const college = await College.findById(collegeId);
    if (!college) {
        return next(new AppError("College not found", 404));
    }

    // --- 1. Handle File Uploads ---
    if (files) {
        // Helper to get file path
        const getPath = (file) => `${file.destination}/${file.filename}`;

        // Map of single-image fields in req.files to schema fields
        const singleImageFields = {
            collegeLogo: "collegeLogo",
            directorImage: "directorImage",
            aboutImage: "aboutUsImage",
            registrationImage: "registrationImage",
            // Add other single image fields if needed
        };

        for (const fieldName in singleImageFields) {
            if (files[fieldName] && files[fieldName].length > 0) {
                college[singleImageFields[fieldName]] = getPath(files[fieldName][0]);
            }
        }

        // Map of multiple-image fields
        const multiImageFields = [
            "galleryImages", "classroomImages", "libraryImages", "labImages",
            "sportsImages", "hostelImages", "cafeteriaImages"
        ];

        multiImageFields.forEach(fieldName => {
            if (files[fieldName] && files[fieldName].length > 0) {
                const newImagePaths = files[fieldName].map(getPath);
                // Push new images to the existing array
                college[fieldName].push(...newImagePaths);
            }
        });
    }

    // --- 2. Handle Direct Field & Nested Object Updates ---

    // Use lodash.merge to recursively update nested objects without overwriting nested data
    // This handles all simple fields, and nested objects like 'institutionDetails', 'accreditationChecklist', etc.
    // It will also replace arrays like 'courses' or 'achievements' if they are present in the request body.
    _.merge(college, updateData);

    // --- 3. Optional: Update Status Logic ---
    if (college.name && college.collegeName && college.collegeLogo) {
        // You might want to update this logic based on new requirements
        if (college.status === "profilePending") {
            college.status = "profileCompleted";
        }
    }

    await college.save();

    res.status(200).json({
        status: true,
        message: "College profile updated successfully",
        data: college,
    });
});