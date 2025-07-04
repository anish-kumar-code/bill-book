const PaymentVoucher = require("../../../models/paymentVoucher");
const getGeneric = require("../../../utils/getGeneric");

exports.getPaymentVoucher = getGeneric(PaymentVoucher, "paymentVoucher");
