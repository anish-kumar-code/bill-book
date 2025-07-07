const catchAsync = require("../../../utils/catchAsync");

exports.getDashboard = catchAsync(async (req, res) => {
    try {
        // Mock database queries - replace with actual model calls
        const quotationCount = 25;
        const surveyCount = 15;
        const packingCount = 30;
        const lrCount = 20;
        const billCount = 35;
        const moneyCount = 40;
        const carCount = 10;
        const paymentCount = 28;
        const voucherCount = 18;
        const formCount = 22;
        const receiptCount = 15;
        const conditionCount = 12;
        const invoiceCount = 27;
        const proformaCount = 19;
        const listCount = 33;

        return res.status(200).json({
            status: true,
            message: "Dashboard data fetched successfully",
            data: {
                quotationCount,
                surveyCount,
                packingCount,
                lrCount,
                billCount,
                moneyCount,
                carCount,
                paymentCount,
                voucherCount,
                formCount,
                receiptCount,
                conditionCount,
                invoiceCount,
                proformaCount,
                listCount
            }
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});