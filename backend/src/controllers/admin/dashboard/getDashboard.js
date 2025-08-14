<<<<<<< HEAD
const college = require("../../../models/college");
const enquiry = require("../../../models/enquiry");
const catchAsync = require("../../../utils/catchAsync");


exports.getDashboard = catchAsync(async (req, res) => {
    try {

        const collegeCount = await college.countDocuments();
        const enquiryCount = await enquiry.countDocuments({ status: "active" });

        return res.status(200).json({
            status: true,
            message: "College fetched successfully",
            data: { collegeCount, enquiryCount }
        })
=======
const catchAsync = require("../../../utils/catchAsync");

exports.getDashboard = catchAsync(async (req, res) => {
    try {

        const dashboardData = {
            overview: {
                today: 1500,
                week: 10450,
                month: 45000,
                year: 180000
            },
            salesGraph: {
                "sales": [
                    200,
                    450,
                    700,
                    300,
                    600,
                    800,
                    900
                ]
            },
            userStatus: {
                active: 120,
                inactive: 30,
                paid: 90,
                unpaid: 60,
                newUsers: 15
            }
        };

        return res.status(200).json({
            status: true,
            message: "Dashboard data fetched successfully",
            data: dashboardData
        });
>>>>>>> 994b6e6f45fa89f1eead27422e59b1fa590ee560

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
<<<<<<< HEAD
})
=======
});
>>>>>>> 994b6e6f45fa89f1eead27422e59b1fa590ee560
