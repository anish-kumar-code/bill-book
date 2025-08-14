const Bill = require("../../../models/bill");
const catchAsync = require("../../../utils/catchAsync");
const getGeneric = require("../../../utils/getGeneric");

exports.getBill = getGeneric(Bill,"bill")
