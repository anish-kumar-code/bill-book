const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { sendOtp } = require('../controllers/user/auth/sendOtp');
const { verifyOtp } = require('../controllers/user/auth/verifyOtp');
const { getProfile } = require('../controllers/user/auth/getProfile');
const { updateProfile } = require('../controllers/user/auth/updateProfile');
const { userAuthenticate } = require('../controllers/user/auth/userAuthenticate');
const { getCms } = require('../controllers/user/cms/getCms');
const { getHomeData } = require('../controllers/user/home/getHomeData');
<<<<<<< HEAD
const { getCollegeList } = require('../controllers/user/home/collegeList');
const initiateCall = require('../controllers/user/call/initiateCall');
const { createCollege } = require('../controllers/user/home/createCollege');
const { updateCollege } = require('../controllers/user/home/updateCollege');
=======
const { createCompany } = require('../controllers/user/company/createCompany');
const { getCompany } = require('../controllers/user/company/getCompany');
const { updateCompany } = require('../controllers/user/company/updateCompany');
const { createQuotation } = require('../controllers/user/quotation/createQuotation');
const { generateQuotationPDF } = require('../controllers/user/quotation/generateQuotationPDF');
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
const deleteQuotation = require('../controllers/user/quotation/deleteQuotation');
const deleteSurvey = require('../controllers/user/survey/deleteSurvey');
const deletePacking = require('../controllers/user/packing/deletePacking');
const deleteLrbilty = require('../controllers/user/lrbilty/deleteLrbilty');
const deleteProforma = require('../controllers/user/proforma/deleteProforma');
const deleteBill = require('../controllers/user/bill/deleteBill');
const deleteMoney = require('../controllers/user/money/deleteMoney');
const deleteCarCondition = require('../controllers/user/carCondition/deleteCarCondition');
const deletePaymentVoucher = require('../controllers/user/paymentVoucher/deletePaymentVoucher');
const deleteTws = require('../controllers/user/tws/deleteTws');
const deleteFovScf = require('../controllers/user/fovScf/deleteFovScf');
const deleteNoc = require('../controllers/user/noc/deleteNoc');
const { deleteUser } = require('../controllers/user/auth/deleteUser');
const { getSubscription } = require('../controllers/user/subscription/getSubscription');
const { takeSubscription } = require('../controllers/user/subscription/takeSubscription');
const { getSubscriptionHistory } = require('../controllers/user/subscription/getSubscriptionHistory');
>>>>>>> 994b6e6f45fa89f1eead27422e59b1fa590ee560

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


<<<<<<< HEAD

=======
>>>>>>> 994b6e6f45fa89f1eead27422e59b1fa590ee560
//------------------------------------------------
// home Data
//------------------------------------------------
router.get('/home', userAuthenticate, getHomeData);



//------------------------------------------------
<<<<<<< HEAD
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
=======
// quotation Data
//-----------------------------------------------
router.get('/quotation', userAuthenticate, getQuotation);
router.post('/quotation', userAuthenticate, createQuotation);
router.delete('/quotation/:id', userAuthenticate, deleteQuotation);
router.get('/quotation/:id/pdf', userAuthenticate, generateQuotationPDF);


//------------------------------------------------
// survey Data
//-----------------------------------------------
router.get('/survey', userAuthenticate, getSurvey);
router.post('/survey', userAuthenticate, createSurvey);
router.delete('/survey/:id', userAuthenticate, deleteSurvey);


//------------------------------------------------
// packing Data
//-----------------------------------------------
router.get('/packing', userAuthenticate, getPacking);
router.post('/packing', userAuthenticate, createPacking);
router.delete('/packing/:id', userAuthenticate, deletePacking);


//------------------------------------------------
// lrbilty Data
//-----------------------------------------------
router.get('/lrbilty', userAuthenticate, getLrbilty);
router.post('/lrbilty', userAuthenticate, createLrbilty);
router.delete('/lrbilty/:id', userAuthenticate, deleteLrbilty);


//------------------------------------------------
// proforma Data
//-----------------------------------------------
router.get('/proforma', userAuthenticate, getProforma);
router.post('/proforma', userAuthenticate, createProforma);
router.delete('/proforma/:id', userAuthenticate, deleteProforma);


//------------------------------------------------
// bill Data
//-----------------------------------------------
router.get('/bill', userAuthenticate, getBill);
router.post('/bill', userAuthenticate, createBill);
router.delete('/bill/:id', userAuthenticate, deleteBill);


//-----------------------------------------------
// money Data
//------------------------------------------------
router.get('/money', userAuthenticate, getMoney);
router.post('/money', userAuthenticate, createMoney);
router.delete('/money/:id', userAuthenticate, deleteMoney);


//------------------------------------------------
// car condition Data
//-----------------------------------------------
router.get('/carCondition', userAuthenticate, getCarCondition);
router.post('/carCondition', userAuthenticate, createCarCondition);
router.delete('/carCondition/:id', userAuthenticate, deleteCarCondition);


//------------------------------------------------
// payment voucher Data
//-----------------------------------------------
router.get('/paymentVoucher', userAuthenticate, getPaymentVoucher);
router.post('/paymentVoucher', userAuthenticate, createPaymentVoucher);
router.delete('/paymentVoucher/:id', userAuthenticate, deletePaymentVoucher);


//------------------------------------------------
// tws Data
//-----------------------------------------------
router.get('/tws', userAuthenticate, getTws);
router.post('/tws', userAuthenticate, createTws);
router.delete('/tws/:id', userAuthenticate, deleteTws);


//------------------------------------------------
// fov Scf Data
//-----------------------------------------------
router.get('/fovScf', userAuthenticate, getFovScf);
router.post('/fovScf', userAuthenticate, createFovScf);
router.delete('/fovScf/:id', userAuthenticate, deleteFovScf);


//------------------------------------------------
// noc Data
//-----------------------------------------------
router.get('/noc', userAuthenticate, getNoc);
router.post('/noc', userAuthenticate, createNoc);
router.delete('/noc/:id', userAuthenticate, deleteNoc);



//------------------------------------------------
// noc Data
//-----------------------------------------------
// router.delete('/doc/:id', userAuthenticate, deleteDoc)



//------------------------------------------------
// company Data
//-----------------------------------------------
router.get('/company', userAuthenticate, getCompany);
router.post('/company', userAuthenticate, fileUploader("company", [{ name: "logo", maxCount: 1 }, { name: "sign", maxCount: 1 }]), createCompany);
router.patch('/company', userAuthenticate, fileUploader("company", [{ name: "logo", maxCount: 1 }, { name: "sign", maxCount: 1 }]), updateCompany);



//------------------------------------------------
// subscription plan
//------------------------------------------------
router.post('/take/subscription', userAuthenticate, takeSubscription)
router.get('/subscription', userAuthenticate, getSubscription)
router.get('/history/subscription', userAuthenticate, getSubscriptionHistory)
>>>>>>> 994b6e6f45fa89f1eead27422e59b1fa590ee560



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