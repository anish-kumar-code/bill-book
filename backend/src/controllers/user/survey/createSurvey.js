const Survey = require("../../../models/survey");
const createGeneric = require("../../../utils/createGeneric");

exports.createSurvey = createGeneric(Survey, "survey");
