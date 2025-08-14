const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { sendOtp } = require('../controllers/user/auth/sendOtp');
const { verifyOtp } = require('../controllers/user/auth/verifyOtp');
const { getProfile } = require('../controllers/user/auth/getProfile');
const { updateProfile } = require('../controllers/user/auth/updateProfile');
const { userAuthenticate } = require('../controllers/user/auth/userAuthenticate');
const { getCms } = require('../controllers/user/cms/getCms');
const { getHomeData } = require('../controllers/user/home/getHomeData');
const { getCollegeList } = require('../controllers/user/home/collegeList');
const initiateCall = require('../controllers/user/call/initiateCall');
const { createCollege } = require('../controllers/user/home/createCollege');
const { updateCollege } = require('../controllers/user/home/updateCollege');

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
// college Data
//------------------------------------------------
router.get('/college', userAuthenticate, getCollegeList);
router.post('/college', userAuthenticate, createCollege);

router.patch("/college/:collegeId",
    fileUploader("college",
        [
            { name: "collegeLogo", maxCount: 1 }, { name: "directorImage", maxCount: 1 },
            { name: "aboutImage", maxCount: 1 }, { name: "registrationImage", maxCount: 1 }, { name: "certificateOfIncorporation", maxCount: 1 },
            { name: "otherDocuments", maxCount: 1 }
        ]),
    updateCollege
)

router.post("/call", userAuthenticate, initiateCall);



//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", getCms)

module.exports = router;