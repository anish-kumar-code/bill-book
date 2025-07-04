const Money = require("../../../models/money");
const getGeneric = require("../../../utils/getGeneric");

exports.getMoney = getGeneric(Money, "money");
