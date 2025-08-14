const catchAsync = require("./catchAsync");

const createGeneric = (Model, modelName) =>
    catchAsync(async (req, res) => {
        try {
            const { formData, status } = req.body;
            const userId = req.user._id;

            if (!formData || typeof formData !== "object") {
                return res.status(400).json({
                    status: false,
                    message: "formData is required and must be an object",
                });
            }

            const data = new Model({
                userId,
                formData,
                status: status || "draft",
            });

            await data.save();

            return res.status(201).json({
                status: true,
                message: `${modelName} created successfully`,
                data,
            });
        } catch (error) {
            console.error(`Create ${modelName} Error:`, error);
            return res.status(500).json({
                status: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    });

module.exports = createGeneric;
