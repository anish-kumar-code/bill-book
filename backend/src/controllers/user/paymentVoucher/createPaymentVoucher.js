const PaymentVoucher = require("../../../models/paymentVoucher");
const createGeneric = require("../../../utils/createGeneric");

exports.createPaymentVoucher = createGeneric(PaymentVoucher, "paymentVoucher");
