const Quotation = require("../../../models/quotation");
const catchAsync = require("../../../utils/catchAsync");
const createGeneric = require("../../../utils/createGeneric");

exports.createQuotation = createGeneric(Quotation, "quotation")

