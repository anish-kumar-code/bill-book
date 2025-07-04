const Proforma = require("../../../models/proforma");
const catchAsync = require("../../../utils/catchAsync");
const createGeneric = require("../../../utils/createGeneric");

exports.createProforma = createGeneric(Proforma, "proforma");
