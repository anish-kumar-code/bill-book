const Packing = require("../../../models/packing");
const createGeneric = require("../../../utils/createGeneric");

exports.createPacking = createGeneric(Packing, "packing");
