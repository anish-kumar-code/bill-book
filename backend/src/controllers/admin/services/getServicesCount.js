const Quotation = require("../../../models/quotation");
const User = require("../../../models/user");
const Survey = require("../../../models/survey");
const PackingList = require("../../../models/packing");
const Lrbility = require("../../../models/lrbilty");
const ProformaInvoice = require("../../../models/proforma");
const Bill = require("../../../models/bill");
const MoneyReceipt = require("../../../models/money");
const CarCondition = require("../../../models/carCondition");
const PaymentVoucher = require("../../../models/paymentVoucher");
const TwsForm = require("../../../models/tws");
const FovScf = require("../../../models/fovScf");
const Noc = require("../../../models/noc");
const catchAsync = require("../../../utils/catchAsync");


exports.getServicesCount = catchAsync(async (req, res) => {
    try {
        const { userId } = req.params;

        // Define service models with their keys
        const services = [
            { key: 'quotation', model: Quotation },
            { key: 'survey', model: Survey },
            { key: 'packing_list', model: PackingList },
            { key: 'lr_bilty', model: Lrbility },
            { key: 'proforma_invoice', model: ProformaInvoice },
            { key: 'bill', model: Bill },
            { key: 'money_receipt', model: MoneyReceipt },
            { key: 'car_condition', model: CarCondition },
            { key: 'payment_voucher', model: PaymentVoucher },
            { key: 'tws_form', model: TwsForm },
            { key: 'fov_scf_form', model: FovScf },
            { key: 'noc_letter', model: Noc },
        ];

        // Run count queries concurrently
        const counts = await Promise.all(
            services.map(async ({ key, model }) => ({
                key,
                count: await model.countDocuments({ userId }),
            }))
        );

        // Transform array to object for response
        const countObject = counts.reduce((acc, { key, count }) => {
            acc[key] = count;
            return acc;
        }, {});

        return res.status(200).json({
            status: true,
            message: "Service counts fetched successfully",
            data: countObject,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch service counts",
            error: error.message,
        });
    }
});