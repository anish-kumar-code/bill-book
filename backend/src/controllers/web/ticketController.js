const Event = require("../../models/event");
const Ticket = require("../../models/ticket");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");



/**
 * @desc    Get a single ticket by its ID
 * @route   GET /api/v1/tickets/:id
 */
exports.getTicketByEventId = catchAsync(async (req, res, next) => {

    const collegeId = req.newCollege?._id;
    if (!collegeId) {
        return res.status(400).json({ status: false, message: "College ID is required" });
    }

    const filter = { collegeId };
    // Allow filtering tickets by the event they belong to
    if (req.query.eventId) {
        filter.eventId = req.query.eventId;
    }

    const ticket = await Ticket.find(filter)

    if (!ticket) {
        return next(new AppError("No ticket found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            ticket,
        },
    });
});