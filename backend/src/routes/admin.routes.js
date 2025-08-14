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
const { getEnquiry } = require('../controllers/admin/enquiry/getEnquiry');
const { createCollegeId } = require('../controllers/admin/college/createCollegeId');
const { updateCollege } = require('../controllers/admin/college/updateCollege');
const { getCollege } = require('../controllers/admin/college/getCollege');
const { getCollegeDetails } = require('../controllers/admin/college/getCollegeDetails');
const { getDashboard } = require('../controllers/admin/dashboard/getDashboard');
const { createCollege } = require('../controllers/admin/college/createCollege');

const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/admin/eventController");
const { getAllTickets, updateTicket, deleteTicket } = require('../controllers/admin/ticketController');
const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/admin/employeeController');

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
// auth
//------------------------------------------------
router.get("/dashboard", getDashboard)

//------------------------------------------------
// Enquiry
//------------------------------------------------
router.get("/enquiry", getEnquiry)



//------------------------------------------------
// College
//------------------------------------------------
router.post("/college/createId", createCollegeId)
router.post("/college/create", fileUploader("college",
    [
        { name: "collegeLogo", maxCount: 1 }, { name: "directorImage", maxCount: 1 },
        { name: "aboutImage", maxCount: 1 }, { name: "registrationImage", maxCount: 1 }, { name: "certificateOfIncorporation", maxCount: 1 },
        { name: "otherDocuments", maxCount: 1 }
    ]), createCollege);

router.patch("/college/:collegeId",
    fileUploader("college",
        [
            { name: "collegeLogo", maxCount: 1 }, { name: "directorImage", maxCount: 1 },
            { name: "aboutImage", maxCount: 1 }, { name: "registrationImage", maxCount: 1 }, { name: "certificateOfIncorporation", maxCount: 1 },
            { name: "otherDocuments", maxCount: 1 }
        ]),
    updateCollege
)
router.get("/college", getCollege)
router.get("/college/:id", getCollegeDetails)



//------------------------------------------------
// Event
//------------------------------------------------
router.post("/event", createEvent)
router.get("/event", getAllEvents);
router.get("/event/:id", getEventById)
router.patch("/event/:id", updateEvent)
router.delete("/event/:id", deleteEvent)



//------------------------------------------------
// Ticket
//------------------------------------------------
router.get("/ticket", getAllTickets);
router.patch("/ticket/:ticketId", updateTicket);
router.delete("/ticket/:ticketId", deleteTicket);



//------------------------------------------------
// Employee
//------------------------------------------------
router.post("/employee", createEmployee)
router.get("/employee", getAllEmployees);
router.get("/employee/:id", getEmployeeById)
router.patch("/employee/:id", updateEmployee)
router.delete("/employee/:id", deleteEmployee)






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