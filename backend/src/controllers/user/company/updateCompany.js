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

        const { name, sign, tagline, gst_no, pan, email, contactNumbers, address, city, state, website, accountHolderName, bankName, accountNo, ifscCode, branch, upiIds } = req.body;

        // File upload paths
        const logo = req.files?.logo?.[0]?.path;
        const signFile = req.files?.sign?.[0]?.path;

        // Parse arrays
        const contacts = Array.isArray(contactNumbers)
            ? contactNumbers
            : (contactNumbers || "").split(",").map(c => c.trim()).filter(Boolean);

        const upiArray = Array.isArray(upiIds)
            ? upiIds
            : (upiIds || "").split(",").map(u => u.trim()).filter(Boolean);

        // Prepare update object
        const updateData = {
            ...(name && { name }),
            ...(logo && { logo }),
            ...(signFile && { sign: signFile }),
            ...(sign && !signFile && { sign }),
            ...(tagline && { tagline }),
            ...(gst_no && { gst_no }),
            ...(pan && { pan }),
            ...(email && { email }),
            ...(address && { address }),
            ...(city && { city }),
            ...(state && { state }),
            ...(website && { website }),
            ...(contacts.length > 0 && { contact_numbers: contacts }),
            bank_details: {
                ...(accountHolderName && { account_holder_name: accountHolderName }),
                ...(bankName && { bank_name: bankName }),
                ...(accountNo && { account_no: accountNo }),
                ...(ifscCode && { ifsc_code: ifscCode }),
                ...(branch && { branch }),
                ...(upiArray.length > 0 && { upi_ids: upiArray })
            }
        };

        // Update the company for the user
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
