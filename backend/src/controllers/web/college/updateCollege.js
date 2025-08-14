// const College = require("../../../models/college");
// const AppError = require("../../../utils/AppError");
// const catchAsync = require("../../../utils/catchAsync");


// exports.updateCollege = catchAsync(async (req, res, next) => {
//     const collegeId = req.newCollege._id;
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

//     if (req.files && req.files.certificateOfIncorporation && req.files.certificateOfIncorporation.length > 0) {
//         const uploadedPath = `${req.files.certificateOfIncorporation[0].destination}/${req.files.certificateOfIncorporation[0].filename}`;
//         college.certificateOfIncorporationUrl = uploadedPath;
//     }

//     if (req.files && req.files.otherDocuments && req.files.otherDocuments.length > 0) {
//         const uploadedPath = `${req.files.otherDocuments[0].destination}/${req.files.otherDocuments[0].filename}`;
//         college.otherDocumentsUrl = uploadedPath;
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

//     // --- NEW CODE FOR NESTED & EXTRA FIELDS ---

//     // Update institutionDetails if provided
//     if (updateData.institutionDetails) {
//         college.institutionDetails = college.institutionDetails || {};
//         Object.keys(updateData.institutionDetails).forEach(key => {
//             college.institutionDetails[key] = updateData.institutionDetails[key];
//         });
//     }

//     // Update legalAndFinancialDetails if provided
//     if (updateData.legalAndFinancialDetails) {
//         college.legalAndFinancialDetails = college.legalAndFinancialDetails || {}
//         Object.keys(updateData.legalAndFinancialDetails).forEach(key => {
//             college.legalAndFinancialDetails[key] = updateData.legalAndFinancialDetails[key];
//         });
//     }

//     // Update staff details if provided
//     if (updateData.staffName !== undefined) college.staffName = updateData.staffName;
//     if (updateData.staffQualification !== undefined) college.staffQualification = updateData.staffQualification;
//     if (updateData.staffYear !== undefined) college.staffYear = updateData.staffYear;

//     // Update referralSource if provided
//     if (updateData.referralSource !== undefined) {
//         college.referralSource = updateData.referralSource;
//     }

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
// -------------------------------------------------


const College = require("../../../models/college");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.updateCollege = catchAsync(async (req, res, next) => {
    const collegeId = req.newCollege._id;
    const updateData = req.body;

    const college = await College.findById(collegeId);
    if (!college) {
        return next(new AppError("College not found", 404));
    }

    // --- IMAGE HANDLING ---
    const imageFields = {
        collegeLogo: "collegeLogo",
        directorImage: "directorImage",
        aboutUsImage: "aboutUsImage",
        registrationImage: "registrationImage",
        certificateOfIncorporation: "certificateOfIncorporationUrl",
        otherDocuments: "otherDocumentsUrls",
    };

    Object.keys(imageFields).forEach(field => {
        if (req.files && req.files[field] && req.files[field].length > 0) {
            const uploadedPath = `${req.files[field][0].destination}/${req.files[field][0].filename}`;
            if (field === "certificateOfIncorporation" || field === "otherDocuments") {
                // Store in nested legalAndFinancialDetails
                college.legalAndFinancialDetails = college.legalAndFinancialDetails || {};
                college.legalAndFinancialDetails[imageFields[field]] = uploadedPath;
            } else {
                college[imageFields[field]] = uploadedPath;
            }
        }
    });

    // Handle array images (gallery, classroom, etc.)
    const arrayImageFields = [
        "galleryImages",
        "classroomImages",
        "libraryImages",
        "labImages",
        "sportsImages",
        "hostelImages",
        "cafeteriaImages"
    ];
    arrayImageFields.forEach(field => {
        if (updateData[field]) {
            // Ensure array format
            college[field] = Array.isArray(updateData[field]) ? updateData[field] : [updateData[field]];
        }
    });

    // --- TOP-LEVEL SIMPLE FIELDS ---
    const allowedFields = [
        "name", "email", "mobileNo", "collegeName", "category", "collegeCode",
        "collegeId", "collegeIdUnique", "password", "description", "address",
        "city", "state", "pincode", "website", "contactPerson", "aboutUs",
        "directorName", "directorMessage", "libraryDescription", "admissionProcess",
        "feeStructure", "staffName", "staffQualification", "staffYear",
        "academicProgram", "referralSource", "transactionId", "paymentStatus", "status",
        "callStatus", "callDescription"
    ];
    allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
            college[field] = updateData[field];
        }
    });

    // --- NESTED OBJECTS ---
    if (updateData.institutionDetails) {
        college.institutionDetails = {
            ...college.institutionDetails,
            ...updateData.institutionDetails
        };
    }

    if (updateData.legalAndFinancialDetails) {
        college.legalAndFinancialDetails = {
            ...college.legalAndFinancialDetails,
            ...updateData.legalAndFinancialDetails
        };
    }

    if (updateData.accreditationChecklist) {
        college.accreditationChecklist = {
            ...college.accreditationChecklist,
            ...updateData.accreditationChecklist
        };
    }

    // --- AUTO PROFILE STATUS UPDATE ---
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
