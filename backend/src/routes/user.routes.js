const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { sendOtp } = require('../controllers/user/auth/sendOtp');
const { verifyOtp } = require('../controllers/user/auth/verifyOtp');
const { getProfile } = require('../controllers/user/auth/getProfile');
const { updateProfile } = require('../controllers/user/auth/updateProfile');
const { userAuthenticate } = require('../controllers/user/auth/userAuthenticate');
const { getCms } = require('../controllers/user/cms/getCms');
const { getHomeData } = require('../controllers/user/home/getHomeData');

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({ message: "this is user test route" });
})

//------------------------------------------------
// auth
//------------------------------------------------
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/profile', userAuthenticate, getProfile);
router.patch('/profile', userAuthenticate, fileUploader("user", [{ name: "image", maxCount: 1 }]), updateProfile);

//------------------------------------------------
// home Data
//------------------------------------------------
router.get('/home', userAuthenticate, getHomeData);

//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", getCms)

module.exports = router;