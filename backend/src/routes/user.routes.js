const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { sendOtp } = require('../controllers/user/auth/sendOtp');
const { verifyOtp } = require('../controllers/user/auth/verifyOtp');
const { getProfile } = require('../controllers/user/auth/getProfile');
const { updateProfile } = require('../controllers/user/auth/updateProfile');
const { userAuthenticate } = require('../controllers/user/auth/userAuthenticate');
const { getCms } = require('../controllers/user/cms/getCms');
const { getHomeData } = require('../controllers/user/home/getHomeData');
const { createCompany } = require('../controllers/user/company/createCompany');
const { getCompany } = require('../controllers/user/company/getCompany');
const { updateCompany } = require('../controllers/user/company/updateCompany');
const { createQuotation } = require('../controllers/user/quotation/createQuotation');
const { createSurvey } = require('../controllers/user/survey/createSurvey');
const { createPacking } = require('../controllers/user/packing/createPacking');
const { createLrbilty } = require('../controllers/user/lrbilty/createLrbilty');
const { createProforma } = require('../controllers/user/proforma/createProforma');
const { createBill } = require('../controllers/user/bill/createBill');
const { createMoney } = require('../controllers/user/money/createMoney');
const { createCarCondition } = require('../controllers/user/carCondition/createCarCondition');
const { createPaymentVoucher } = require('../controllers/user/paymentVoucher/createPaymentVoucher');
const { createTws } = require('../controllers/user/tws/createTws');
const { createFovScf } = require('../controllers/user/fovScf/createFovScf');
const { createNoc } = require('../controllers/user/noc/createNoc');
const { getBill } = require('../controllers/user/bill/getBill');
const { getQuotation } = require('../controllers/user/quotation/getQuotation');
const { getCarCondition } = require('../controllers/user/carCondition/getCarCondition');
const { getSurvey } = require('../controllers/user/survey/getSurvey');
const { getPacking } = require('../controllers/user/packing/getPacking');
const { getLrbilty } = require('../controllers/user/lrbilty/getLrbilty');
const { getProforma } = require('../controllers/user/proforma/getProforma');
const { getMoney } = require('../controllers/user/money/getMoney');
const { getPaymentVoucher } = require('../controllers/user/paymentVoucher/getPaymentVoucher');
const { getTws } = require('../controllers/user/tws/getTws');
const { getFovScf } = require('../controllers/user/fovScf/getFovScf');
const { getNoc } = require('../controllers/user/noc/getNoc');
const { showDeletePage } = require('../controllers/user/auth/showDeletePage');
const { findUser } = require('../controllers/user/auth/findUser');
const { deleteUser } = require('../controllers/user/auth/deleteUser');

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
// quotation Data
//-----------------------------------------------
router.get('/quotation', userAuthenticate, getQuotation);
router.post('/quotation', userAuthenticate, createQuotation);


//------------------------------------------------
// survey Data
//-----------------------------------------------
router.get('/survey', userAuthenticate, getSurvey);
router.post('/survey', userAuthenticate, createSurvey);


//------------------------------------------------
// packing Data
//-----------------------------------------------
router.get('/packing', userAuthenticate, getPacking);
router.post('/packing', userAuthenticate, createPacking);


//------------------------------------------------
// lrbilty Data
//-----------------------------------------------
router.get('/lrbilty', userAuthenticate, getLrbilty);
router.post('/lrbilty', userAuthenticate, createLrbilty);


//------------------------------------------------
// proforma Data
//-----------------------------------------------
router.get('/proforma', userAuthenticate, getProforma);
router.post('/proforma', userAuthenticate, createProforma);


//------------------------------------------------
// bill Data
//-----------------------------------------------
router.get('/bill', userAuthenticate, getBill);
router.post('/bill', userAuthenticate, createBill);


//-----------------------------------------------
// money Data
//------------------------------------------------
router.get('/money', userAuthenticate, getMoney);
router.post('/money', userAuthenticate, createMoney);


//------------------------------------------------
// car condition Data
//-----------------------------------------------
router.get('/carCondition', userAuthenticate, getCarCondition);
router.post('/carCondition', userAuthenticate, createCarCondition);


//------------------------------------------------
// payment voucher Data
//-----------------------------------------------
router.get('/paymentVoucher', userAuthenticate, getPaymentVoucher);
router.post('/paymentVoucher', userAuthenticate, createPaymentVoucher);


//------------------------------------------------
// tws Data
//-----------------------------------------------
router.get('/tws', userAuthenticate, getTws);
router.post('/tws', userAuthenticate, createTws);


//------------------------------------------------
// fov Scf Data
//-----------------------------------------------
router.get('/fovScf', userAuthenticate, getFovScf);
router.post('/fovScf', userAuthenticate, createFovScf);


//------------------------------------------------
// noc Data
//-----------------------------------------------
router.get('/noc', userAuthenticate, getNoc);
router.post('/noc', userAuthenticate, createNoc);




//------------------------------------------------
// company Data
//-----------------------------------------------
router.get('/company', userAuthenticate, getCompany);
router.post('/company', userAuthenticate, fileUploader("company", [{ name: "logo", maxCount: 1 }, { name: "sign", maxCount: 1 }]), createCompany);
router.patch('/company', userAuthenticate, fileUploader("company", [{ name: "logo", maxCount: 1 }, { name: "sign", maxCount: 1 }]), updateCompany);




//------------------------------------------------
// cms
//------------------------------------------------
router.get("/cms", getCms);


//------------------------------------------------
// delete user
//------------------------------------------------
router.get("/delete-user", showDeletePage);
router.post("/find-user", findUser);
router.post("/delete-user/:id", deleteUser);



module.exports = router;