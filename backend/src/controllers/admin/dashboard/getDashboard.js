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

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});