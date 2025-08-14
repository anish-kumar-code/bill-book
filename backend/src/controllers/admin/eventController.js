const Event = require("../../models/event");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");


/**
 * @desc    Create a new event
 * @route   POST /api/v1/events
 * @access  Private
 */
exports.createEvent = catchAsync(async (req, res, next) => {
    const { name, date, place, status } = req.body;

    const newEvent = await Event.create({
        name,
        date,
        place,
        status,
    });

    res.status(201).json({
        status: "success",
        data: {
            event: newEvent,
        },
    });
});

/**
 * @desc    Get all events
 * @route   GET /api/v1/events
 * @access  Public
 */
exports.getAllEvents = catchAsync(async (req, res, next) => {
    const events = await Event.find();

    res.status(200).json({
        status: "success",
        results: events.length,
        data: {
            events,
        },
    });
});

/**
 * @desc    Get a single event by ID
 * @route   GET /api/v1/events/:id
 * @access  Public
 */
exports.getEventById = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            event,
        },
    });
});

/**
 * @desc    Update an event
 * @route   PATCH /api/v1/events/:id
 * @access  Private
 */
exports.updateEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
    });

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            event,
        },
    });
});

/**
 * @desc    Delete an event
 * @route   DELETE /api/v1/events/:id
 * @access  Private
 */
exports.deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
        return next(new AppError("No event found with that ID", 404));
    }

    // 204 No Content is a standard response for successful deletions
    res.status(200).json({
        status: "success",
        data: event,
    });
});