const Company = require("../../../models/company");
const catchAsync = require("../../../utils/catchAsync");

exports.createCompany = catchAsync(async (req, res) => {
    try {
        const { name, sign, tagline, gst_no, pan, email, contactNumbers, address, city, state, website, accountHolderName, bankName, accountNo, ifscCode, branch, upiIds = [] } = req.body;

        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        // Optional: handle file uploads (if using multer)
        const logo = req.files?.logo?.[0]?.path || "";
        const signFile = req.files?.sign?.[0]?.path || sign || "";

        // Optional: contactNumbers may come as comma separated string
        const contacts = Array.isArray(contactNumbers)
            ? contactNumbers
            : (contactNumbers || "").split(",").map(c => c.trim()).filter(Boolean);

        const newCompany = new Company({
            userId: userId, name, logo, sign: signFile, tagline, gst_no, pan, email, contactNumbers: contacts, address, city, state, website,
            bankDetails: {
                accountHolderName,
                bankName,
                accountNo,
                ifscCode,
                branch,
                upiIds: Array.isArray(upiIds) ? upiIds : [upiIds]
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
