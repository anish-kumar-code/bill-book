const CarCondition = require("../../../models/carCondition");
const getGeneric = require("../../../utils/getGeneric");

exports.getCarCondition = getGeneric(CarCondition, "carCondition");
