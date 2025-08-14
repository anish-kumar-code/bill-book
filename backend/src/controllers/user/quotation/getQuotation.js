const Quotation = require("../../../models/quotation");
const getGeneric = require("../../../utils/getGeneric");

exports.getQuotation = getGeneric(Quotation,"quotation")
