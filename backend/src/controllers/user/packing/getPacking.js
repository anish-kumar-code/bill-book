const Packing = require("../../../models/packing");
const getGeneric = require("../../../utils/getGeneric");

exports.getPacking = getGeneric(Packing, "packing");
