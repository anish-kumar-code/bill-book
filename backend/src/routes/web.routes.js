const express = require('express');
const fileUploader = require('../middlewares/fileUploader');
const { getCms } = require('../controllers/user/cms/getCms');
const { addEnquiry } = require('../controllers/web/enquiry/addEnquiry');
const { login } = require('../controllers/web/college/auth/login');
const { updateCollege } = require('../controllers/web/college/updateCollege');
const { collegeAuthenticate } = require('../controllers/web/college/auth/collegeAuthenticate');
const { getCollegeDetails } = require('../controllers/web/college/getCollegeDetails');
const { uploadGalleryImage } = require('../controllers/web/college/uploadGalleryImage');
const { getCollegeList } = require('../controllers/web/college/getCollegeList');
const { createTicket, getTicketByCollegeId } = require('../controllers/admin/ticketController');
const { getAllEvents } = require('../controllers/web/eventController');
const { getTicketByEventId } = require('../controllers/web/ticketController');

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({ message: "this is web test route" });
})


//------------------------------------------------
// enquiry Data
//------------------------------------------------
router.post("/enquiry", addEnquiry)


//------------------------------------------------
// college
//------------------------------------------------
router.post("/college/login", login)
router.patch("/college",
    collegeAuthenticate,
    fileUploader("college",
        [
            { name: "collegeLogo", maxCount: 1 }, { name: "directorImage", maxCount: 1 },
            { name: "aboutImage", maxCount: 1 }, { name: "registrationImage", maxCount: 1 },
            { name: "certificateOfIncorporation", maxCount: 1 }, { name: "otherDocuments", maxCount: 1 }
        ]),
    updateCollege
);
router.patch("/college/gallery", collegeAuthenticate, fileUploader("college-gallery", [{ name: "gallery", maxCount: 10 }]), uploadGalleryImage);


router.get("/college", collegeAuthenticate, getCollegeDetails);
router.get("/college/list", collegeAuthenticate, getCollegeList);


//------------------------------------------------
// Ticket
//------------------------------------------------
router.get("/event", collegeAuthenticate, getAllEvents);
router.post("/ticket", collegeAuthenticate, createTicket)
router.get("/ticket", collegeAuthenticate, getTicketByEventId);



//------------------------------------------------
// cms
//------------------------------------------------
// router.get("/cms", getCms)

module.exports = router;