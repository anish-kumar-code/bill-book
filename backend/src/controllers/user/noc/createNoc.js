const Noc = require("../../../models/noc");
const createGeneric = require("../../../utils/createGeneric");

exports.createNoc = createGeneric(Noc, "noc");
