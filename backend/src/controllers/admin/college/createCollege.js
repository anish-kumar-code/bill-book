const College = require("../../../models/college");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.createCollege = catchAsync(async (req, res, next) => {
    const collegeData = req.body;

    // Initialize new college object
    const newCollege = new College();

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
                newCollege.legalAndFinancialDetails = newCollege.legalAndFinancialDetails || {};
                newCollege.legalAndFinancialDetails[imageFields[field]] = uploadedPath;
            } else {
                newCollege[imageFields[field]] = uploadedPath;
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
        if (collegeData[field]) {
            newCollege[field] = Array.isArray(collegeData[field]) ? collegeData[field] : [collegeData[field]];
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
        if (collegeData[field] !== undefined) {
            newCollege[field] = collegeData[field];
        }
    });

    // --- NESTED OBJECTS ---
    if (collegeData.institutionDetails) {
        newCollege.institutionDetails = {
            ...collegeData.institutionDetails
        };
    }

    if (collegeData.legalAndFinancialDetails) {
        newCollege.legalAndFinancialDetails = {
            ...collegeData.legalAndFinancialDetails
        };
    }

    if (collegeData.accreditationChecklist) {
        newCollege.accreditationChecklist = {
            ...collegeData.accreditationChecklist
        };
    }

    // --- AUTO PROFILE STATUS UPDATE ---
    if (newCollege.name && newCollege.collegeName && newCollege.collegeLogo) {
        newCollege.status = "profileCompleted";
    } else {
        newCollege.status = "profilePending";
    }

    // Save the new college
    await newCollege.save();

    res.status(201).json({
        status: true,
        message: "College added successfully",
        data: newCollege
    });
});
