const catchAsync = require("../../../utils/catchAsync");

exports.getRecentTransactions = catchAsync(async (req, res) => {
    try {
        // Mock data for recent transactions - replace with actual database query
        const recentTransactions = [
            {
                name: "Ravi Sharma",
                id: "INV55501",
                amount: 789.50,
                date: "2025-07-08T14:30:00Z" // 03:00 PM IST today
            },
            {
                name: "Priya Patel",
                id: "INV55502",
                amount: -150.75,
                date: "2025-07-07T15:45:00Z" // Yesterday
            },
            {
                name: "Amit Singh",
                id: "INV55503",
                amount: 620.30,
                date: "2025-07-06T13:20:00Z" // 2 days ago
            },
            {
                name: "Neha Gupta",
                id: "INV55504",
                amount: 450.90,
                date: "2025-07-05T10:15:00Z" // 3 days ago
            },
            {
                name: "Vikram Rao",
                id: "INV55505",
                amount: 299.25,
                date: "2025-07-04T09:00:00Z" // 4 days ago
            }
        ];

        // Filter transactions for the last 7 days (adjust based on your needs)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const filteredTransactions = recentTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= sevenDaysAgo;
        });

        return res.status(200).json({
            status: true,
            message: "Recent transactions fetched successfully",
            data: filteredTransactions
        });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Something went wrong", error: error.message });
    }
});