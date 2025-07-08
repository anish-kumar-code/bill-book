const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { getCms } = require('../controllers/admin/cms/getCms');
const { addCms } = require('../controllers/admin/cms/addCms');
const { updateCms } = require('../controllers/admin/cms/updateCms');
const { signup } = require('../controllers/admin/auth/signup');
const { login } = require('../controllers/admin/auth/login');
const { adminAuthenticate } = require('../controllers/admin/auth/adminAuthenticate');
const { createSetting } = require('../controllers/admin/setting/createSetting');
const { getSetting } = require('../controllers/admin/setting/getSetting');
const { updateSetting } = require('../controllers/admin/setting/updateSetting');
const { updateLogo } = require('../controllers/admin/setting/updateLogo');
const { updateFavicon } = require('../controllers/admin/setting/updateFavicon');
const { updateSettingCard } = require('../controllers/admin/setting/updateSettingCard');
const { getDashboard } = require('../controllers/admin/dashboard/getDashboard');
const { getList } = require('../controllers/admin/list/getList');
const { updateUser } = require('../controllers/admin/user/updateUser');
const { getRecentTransactions } = require('../controllers/admin/dashboard/getRecentTransactions');
const { getNewUsers } = require('../controllers/admin/dashboard/getNewUsers');
const { createSubscriptionPlan } = require('../controllers/admin/subscriptionPlan/createSubscriptionPlan');
const { getSubscriptionPlan } = require('../controllers/admin/subscriptionPlan/getSubscriptionPlan');
const { updateSubscriptionPlan } = require('../controllers/admin/subscriptionPlan/updateSubscriptionPlan');
const { deleteSubscriptionPlan } = require('../controllers/admin/subscriptionPlan/deleteSubscriptionPlan');
const { getUser } = require('../controllers/admin/user/getUser');

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({ message: "this is admin test route" });
})

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/signup', signup)
router.post('/login', login)


//------------------------------------------------
// dashboard
//------------------------------------------------
router.get("/dashboard", getDashboard)
router.get("/recent-transactions", getRecentTransactions)
router.get("/new-users", getNewUsers)


//------------------------------------------------
// list
//------------------------------------------------
router.get("/list", getList)



//------------------------------------------------
// user
//------------------------------------------------
router.get("/user/list", getUser)
router.patch("/user/:userId", updateUser)



//------------------------------------------------
// subscription plan
//------------------------------------------------
router.post("/subscription-plan", createSubscriptionPlan)
router.get("/subscription-plan", getSubscriptionPlan)
router.patch("/subscription-plan/:id", updateSubscriptionPlan)
router.delete("/subscription-plan/:id", deleteSubscriptionPlan)



//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", adminAuthenticate, getCms)
router.post("/cms", adminAuthenticate, addCms)
router.patch("/cms/:id", adminAuthenticate, updateCms)



//------------------------------------------------
// setting
//------------------------------------------------
router.post("/setting", adminAuthenticate, createSetting);
router.get("/setting", adminAuthenticate, getSetting);
router.patch("/setting", adminAuthenticate, updateSetting);
router.patch("/setting/logo", adminAuthenticate, fileUploader("admin", [{ name: "logo", maxCount: 1 }]), updateLogo);
router.patch("/setting/favicon", adminAuthenticate, fileUploader("admin", [{ name: "favicon", maxCount: 1 }]), updateFavicon);
router.patch("/setting/card", adminAuthenticate, fileUploader("admin", [{ name: "image", maxCount: 1 }]), updateSettingCard);
// router.delete("/setting", settingController.deleteSetting);

module.exports = router;