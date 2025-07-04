const Noc = require("../../../models/noc");
const getGeneric = require("../../../utils/getGeneric");

exports.getNoc = getGeneric(Noc, "noc");
