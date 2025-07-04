const Bill = require("../../../models/bill");
const createGeneric = require("../../../utils/createGeneric");

exports.createBill = createGeneric(Bill,"bill")


// const Bill = require("../../../models/bill");
// const catchAsync = require("../../../utils/catchAsync");

// exports.createBill = catchAsync(async (req, res) => {
//     try {
//         const { formData, status } = req.body;
//         const userId = req.user._id;

//         if (!formData || typeof formData !== "object") {
//             return res.status(400).json({
//                 status: false,
//                 message: "formData is required and must be an object"
//             });
//         }

//         const bill = new Bill({
//             userId,
//             formData,
//             status: status || "draft"
//         });

//         await bill.save();

//         return res.status(201).json({
//             status: true,
//             message: "Bill created successfully",
//             data: bill
//         });
//     } catch (error) {
//         console.error("Create Bill Error:", error);
//         return res.status(500).json({
//             status: false,
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// });

