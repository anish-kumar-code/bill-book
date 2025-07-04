const catchAsync = require("./catchAsync");

const getGeneric = (Model, modelName) =>
    catchAsync(async (req, res) => {
        try {
            const userId = req.user._id;
            const { startDate, endDate, page = 1, limit = 10 } = req.query;

            const query = { userId };

            // Optional date filter
            if (startDate && endDate) {
                query.createdAt = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                };
            }

            const skip = (parseInt(page) - 1) * parseInt(limit);

            // Fetch paginated data
            const data = await Model.find(query)
                .sort({ createdAt: -1 }) // latest first (optional)
                .skip(skip)
                .limit(parseInt(limit));

            // Total count
            const total = await Model.countDocuments(query);

            return res.status(200).json({
                status: true,
                message: `${modelName} fetched successfully`,
                data,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit),
                },
            });
        } catch (error) {
            console.error(`Fetching ${modelName} Error:`, error);
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    });

module.exports = getGeneric;
