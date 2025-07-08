const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");

exports.getNewUsers = catchAsync(async (req, res) => {
    try {
        // Mock data for new users - replace with actual database query
        // const newUsers = [
        //     {
        //         name: "Sneha Reddy",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9001",
        //         status: "Accepted",
        //         date: "2025-07-08T15:00:00Z" // 03:00 PM IST today
        //     },
        //     {
        //         name: "Karan Mehta",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9002",
        //         status: "Sent",
        //         date: "2025-07-07T15:30:00Z" // Yesterday
        //     },
        //     {
        //         name: "Anjali Desai",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9003",
        //         status: "Expired",
        //         date: "2025-07-06T12:45:00Z" // 2 days ago
        //     },
        //     {
        //         name: "Rohan Kapoor",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9004",
        //         status: "Declined",
        //         date: "2025-07-05T11:20:00Z" // 3 days ago
        //     },
        //     {
        //         name: "Priyanka Nair",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9005",
        //         status: "Accepted",
        //         date: "2025-07-04T09:15:00Z" // 4 days ago
        //     },
        //     {
        //         name: "Sneha Reddy",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9001",
        //         status: "Accepted",
        //         date: "2025-07-08T14:00:00Z" // 03:00 PM IST today
        //     },
        //     {
        //         name: "Karan Mehta",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9002",
        //         status: "Sent",
        //         date: "2025-07-07T15:30:00Z" // Yesterday
        //     },
        //     {
        //         name: "Anjali Desai",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9003",
        //         status: "Expired",
        //         date: "2025-07-06T12:45:00Z" // 2 days ago
        //     },
        //     {
        //         name: "Rohan Kapoor",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9004",
        //         status: "Declined",
        //         date: "2025-07-05T11:20:00Z" // 3 days ago
        //     },
        //     {
        //         name: "Priyanka Nair",
        //         avatar: "https://via.placeholder.com/48",
        //         quotationId: "QU9005",
        //         status: "Accepted",
        //         date: "2025-07-04T09:15:00Z" // 4 days ago
        //     }
        // ];

        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const newUsers = await User.find({ createdAt: { $gte: thirtyDaysAgo, $lte: today } }).limit(15)
        // console.log(abc.length)

        // Filter users for the last 7 days
        // const sevenDaysAgo = new Date();
        // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // const filteredNewUsers = newUsers.filter(user => {
        //     const userDate = new Date(user.date);
        //     return userDate >= sevenDaysAgo;
        // });

        return res.status(200).json({
            status: true,
            message: "New users fetched successfully",
            data: newUsers
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});