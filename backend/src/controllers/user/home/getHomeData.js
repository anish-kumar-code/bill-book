const doc = require("pdfkit");
const bill = require("../../../models/bill");
const carCondition = require("../../../models/carCondition");
const fovScf = require("../../../models/fovScf");
const lrbilty = require("../../../models/lrbilty");
const money = require("../../../models/money");
const noc = require("../../../models/noc");
const packing = require("../../../models/packing");
const paymentVoucher = require("../../../models/paymentVoucher");
const proforma = require("../../../models/proforma");
const quotation = require("../../../models/quotation");
const Setting = require("../../../models/setting");
const survey = require("../../../models/survey");
const tws = require("../../../models/tws");
const banner = require("../../../models/banner");

exports.getHomeData = async (req, res) => {
    try {
        const userId = req.user._id;

        const setting = await Setting.findOne();
        if (!setting) return res.status(404).json({ message: "Setting not found" });


        const quotationCount = await quotation.countDocuments({ userId });
        const billCount = await bill.countDocuments({ userId });
        const carConditionCount = await carCondition.countDocuments({ userId });
        const fovScfCount = await fovScf.countDocuments({ userId });
        const lrbiltyCount = await lrbilty.countDocuments({ userId });
        const moneyCount = await money.countDocuments({ userId });
        const nocCount = await noc.countDocuments({ userId });
        const packingCount = await packing.countDocuments({ userId });
        const paymentVoucherCount = await paymentVoucher.countDocuments({ userId });
        const proformaCount = await proforma.countDocuments({ userId });
        const surveyCount = await survey.countDocuments({ userId });
        const twsCount = await tws.countDocuments({ userId });

        const banners = await banner.find().sort({ createdAt: -1 });

        const homeData = {
            logo: setting.logo,
            favicon: setting.favicon,
            adminCard: setting.adminCard.isActive ? setting.adminCard : null,
        };

        const docCounts = {
            quotation: quotationCount,
            bill: billCount,
            carCondition: carConditionCount,
            fovScf: fovScfCount,
            lrbilty: lrbiltyCount,
            money: moneyCount,
            noc: nocCount,
            packing: packingCount,
            paymentVoucher: paymentVoucherCount,
            proforma: proformaCount,
            survey: surveyCount,
            tws: twsCount
        }

        res.status(200).json({
            success: true,
            message: "Home Data fetched successfully",
            homeData,
            docCounts,
            banners: banners || []
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
