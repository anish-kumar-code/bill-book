const Proforma = require("../../../models/proforma");
const catchAsync = require("../../../utils/catchAsync");
const getGeneric = require("../../../utils/getGeneric");

exports.getProforma = getGeneric(Proforma, "proforma");
