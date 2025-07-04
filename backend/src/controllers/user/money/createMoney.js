const Money = require("../../../models/money");
const createGeneric = require("../../../utils/createGeneric");

exports.createMoney = createGeneric(Money, "money");
