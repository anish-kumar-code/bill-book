const Company = require("../../../models/company");
const catchAsync = require("../../../utils/catchAsync");

exports.updateCompany = catchAsync(async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        const {
            name,
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

        const logo = req.files?.logo?.[0]?.path;
        const signFile = req.files?.sign?.[0]?.path;

        const updateData = {
            ...(name && { name }),
            ...(logo && { logo }),
            ...(signFile && { sign: signFile }),
            ...(sign && !signFile && { sign }),
            ...(tagline && { tagline }),
            ...(gstNo && { gstNo }),
            ...(pan && { pan }),
            ...(email && { email }),
            ...(whatsappNumber && { whatsappNumber }),
            ...(contactNumber1 && { contactNumber1 }),
            ...(contactNumber2 && { contactNumber2 }),
            ...(contactNumber3 && { contactNumber3 }),
            ...(contactNumber4 && { contactNumber4 }),
            ...(landlineNumber && { landlineNumber }),
            ...(tollFreeNumber && { tollFreeNumber }),
            ...(address && { address }),
            ...(city && { city }),
            ...(state && { state }),
            ...(jurisdiction && { jurisdiction }),
            ...(website && { website }),
            bankDetails: {
                ...(accountHolderName && { accountHolderName }),
                ...(bankName && { bankName }),
                ...(accountNo && { accountNo }),
                ...(ifscCode && { ifscCode }),
                ...(branch && { branch })
            },
            upiDetails: {
                ...(upiId1 && { upiId1 }),
                ...(upiId2 && { upiId2 }),
                ...(phonePeNumber && { phonePeNumber }),
                ...(googlePayNumber && { googlePayNumber })
            },
            otherDetails: {
                ...(affiliatedBy && { affiliatedBy }),
                ...(isoCertificateDetails && { isoCertificateDetails }),
                ...(govtRegNo && { govtRegNo })
            }
        };

        const updatedCompany = await Company.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({
                status: false,
                message: "Company not found for this user"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Company updated successfully",
            data: updatedCompany
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});
