const Survey = require("../../../models/survey");
const getGeneric = require("../../../utils/getGeneric");

exports.getSurvey = getGeneric(Survey, "survey");
