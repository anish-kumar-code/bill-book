const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.ObjectId, ref: "Employee", default: null },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    collegeName: { type: String, default: "" },
    category: { type: String, default: "" },
    collegeCode: { type: String, default: "" },
    collegeLogo: { type: String, default: "" },
    collegeId: { type: String, default: "" },
    collegeIdUnique: { type: String, default: "" },
    password: { type: String, default: "" },
    description: { type: String, default: "" },

    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    pincode: { type: String, default: "" },
    website: { type: String, default: "" },
    contactPerson: { type: String, default: "" },

    aboutUs: { type: String, default: "" },
    aboutUsImage: { type: String, default: "" },

    directorName: { type: String, default: "" },
    directorImage: { type: String, default: "" },
    directorMessage: { type: String, default: "" },

    registrationImage: { type: String, default: "" },

    galleryImages: { type: [String], default: [] },
    classroomImages: { type: [String], default: [] },
    libraryImages: { type: [String], default: [] },
    libraryDescription: { type: String, default: "" },
    labImages: { type: [String], default: [] },
    sportsImages: { type: [String], default: [] },
    hostelImages: { type: [String], default: [] },
    cafeteriaImages: { type: [String], default: [] },

    courses: { type: [String], default: [] },
    departments: { type: [String], default: [] },
    admissionProcess: { type: String, default: "" },
    feeStructure: { type: String, default: "" },

    achievements: { type: [String], default: [] },

    institutionDetails: {
        institutionName: {
            type: String,
            default: ""
        },
        headOfInstitution: {
            type: String,
            default: ""
        },
        institutionAddress: {
            type: String,
            default: ""
        },
        otherAddress: {
            type: String,
            default: ""
        },
        administrativeHeadquarterAddress: {
            type: String,
            default: ""
        },
        postCode: {
            type: String,
            default: ""
        },
        telNumber: {
            type: String,
            default: ""
        },
        faxNumber: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        emailOfHeadOfInstitution: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
    },

    legalAndFinancialDetails: {
        dateOfFormation: { type: String, default: "" },
        ownershipStatus: { type: String, enum: ['Publicly', 'Privately'] },
        ownershipDescription: { type: String, default: "" },
        isLimitedCompany: { type: Boolean, default: true },
        companyName: { type: String, default: "" },
        registrationNo: { type: String, default: "" },
        dateOfRegistration: { type: String, default: "" },
        certificateOfIncorporationUrl: { type: String, default: "" },
        otherDocumentsUrls: { type: String, default: "" },
        modeOfInstruction: { type: String, enum: ['Distance Learning', 'Classroom Learning', 'Blended Learning'] },
        description1: { type: String, default: "" },
        description2: { type: String, default: "" },
        description3: { type: String, default: "" },
    },

    // Section: Staff Details
    staffName: { type: String, default: "" },
    staffQualification: { type: String, default: "" },
    staffYear: { type: String, default: "" },

    // Section: Academic Program
    academicProgram: { type: String, default: "" },

    // Section: QAHE Accreditation Criteria Checklist
    accreditationChecklist: {
        institutionalMissionAndGoals: {
            clearlyDefinedMission: Boolean,
            goalsAlignWithStandards: Boolean
        },
        governanceAndAdministration: {
            establishedGovernanceStructure: Boolean,
            effectiveAdministrativePolicies: Boolean
        },
        academicPrograms: {
            curriculumAlignedWithIndustry: Boolean,
            regularCurriculumReviews: Boolean
        },
        facultyQualifications: {
            facultyPossessQualifications: Boolean,
            ongoingProfessionalDevelopment: Boolean
        },
        studentSupportServices: {
            adequateAdvisingAndCounseling: Boolean,
            resourcesForStudentSuccess: Boolean
        },
        dedicatedAdmissionEmail: {
            type: String,
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.']
        },
        infrastructureAndResources: {
            sufficientPhysicalAndTechResources: Boolean,
            facilitiesSupportPrograms: Boolean,
            classroomFacilitiesUrls: [String],
            eLearningSystemScreenshotUrls: [String]
        },
        assessmentAndEvaluation: {
            sufficientPhysicalAndTechResources: Boolean,
            facilitiesSupportPrograms: Boolean
        },
        complianceAndEthics: {
            adherenceToNationalStandards: Boolean,
            ethicalGuidelinesForIntegrity: Boolean
        }
    },

    // Section: How did you hear about us?
    referralSource: { type: String, default: "" },


    events: {
        type: [{
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            date: Date,
            image: { type: String, default: "" }
        }],
        default: []
    },

    placementInfo: {
        description: { type: String, default: "" },
        stats: { type: Object, default: {} },
        image: { type: String, default: "" }
    },

    transactionId: { type: String, default: "" },
    paymentStatus: { type: String, enum: ["pending", "success", "completed", "failed"], default: "pending" },
    status: { type: String, enum: ["profilePending", "profileCompleted", "active", "inactive"], default: "profilePending" },

    // certificate
    certificate1: { type: Boolean, default: false },
    certificate2: { type: Boolean, default: false },


    callStatus: {
        type: String,
        enum: ["pending", "in progress", "call done", "next day call", "no answer", "not interested", "inactive"],
        default: "pending"
    },
    callDescription: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("College", collegeSchema);
