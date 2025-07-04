const Tws = require("../../../models/tws");
const getGeneric = require("../../../utils/getGeneric");

exports.getTws = getGeneric(Tws, "tws");
