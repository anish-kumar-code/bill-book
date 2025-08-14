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


exports.getServices = catchAsync(async (req, res) => {
    try {

        const { type } = req.query;
        const { userId } = req.params;

        let data;

        switch (type) {
            case "quotation":
                data = await Quotation.find({ userId });
                break;
            case "survey_list":
                data = await Survey.find({ userId });
                break;
            case "packing_list":
                data = await PackingList.find({ userId });
                break;
            case "lr_bilty":
                data = await Lrbility.find({ userId });
                break;
            case "proforma_invoice":
                data = await ProformaInvoice.find({ userId });
                break;
            case "bill":
                data = await Bill.find({ userId });
                break;
            case "money_receipt":
                data = await MoneyReceipt.find({ userId });
                break;
            case "car_condition":
                data = await CarCondition.find({ userId });
                break;
            case "payment_voucher":
                data = await PaymentVoucher.find({ userId });
                break;
            case "tws_form":
                data = await TwsForm.find({ userId });
                break;
            case "fov_scf_form":
                data = await FovScf.find({ userId });
                break;
            case "noc_letter":
                data = await Noc.find({ userId });
                break;
            default:
                return res.status(400).json({ status: false, message: "Invalid service type" });
        }

        return res.status(200).json({
            status: true,
            message: "data fetched successfully",
            data
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});