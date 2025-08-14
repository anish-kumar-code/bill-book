const CarCondition = require("../../../models/carCondition");
const createGeneric = require("../../../utils/createGeneric");

exports.createCarCondition = createGeneric(CarCondition, "carCondition");
