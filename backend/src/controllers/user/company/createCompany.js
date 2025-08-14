const Company = require("../../../models/company");
const catchAsync = require("../../../utils/catchAsync");

exports.createCompany = catchAsync(async (req, res) => {
    try {
        const {
            name,
            tagline,
            gstNo,
            pan,
            email,
            whatsappNumber,
            contactNumber1,
            contactNumber2,
            contactNumber3,
            contactNumber4,
            landlineNumber,
            tollFreeNumber,
            address,
            city,
            state,
            jurisdiction,
            website,
            accountHolderName,
            bankName,
            accountNo,
            ifscCode,
            branch,
            upiId1,
            upiId2,
            phonePeNumber,
            googlePayNumber,
            affiliatedBy,
            isoCertificateDetails,
            govtRegNo
        } = req.body;

        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        // Optional: handle file uploads (if using multer)
        const logo = req.files?.logo?.[0]?.path || "";
        const sign = req.files?.sign?.[0]?.path || "";

        const newCompany = new Company({
            userId,
            name,
            logo,
            sign,
            tagline,
            gstNo,
            pan,
            email,
            whatsappNumber,
            contactNumber1,
            contactNumber2,
            contactNumber3,
            contactNumber4,
            landlineNumber,
            tollFreeNumber,
            address,
            city,
            state,
            jurisdiction,
            website,
            bankDetails: {
                accountHolderName,
                bankName,
                accountNo,
                ifscCode,
                branch,
            },
            upiDetails: {
                upiId1,
                upiId2,
                phonePeNumber,
                googlePayNumber
            },
            otherDetails: {
                affiliatedBy,
                isoCertificateDetails,
                govtRegNo
            }
        });

        await newCompany.save();

        return res.status(201).json({
            status: true,
            message: "Company added successfully",
            data: newCompany
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});
