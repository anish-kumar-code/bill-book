const Event = require("../../models/event");
const Ticket = require("../../models/ticket");
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
    const collegeId = req.newCollege?._id;
    if (!collegeId) {
        return res.status(400).json({ status: false, message: "College ID is required" });
    }

    // Get all events
    const events = await Event.find();

    // Get all tickets for this college
    const tickets = await Ticket.find({ collegeId });

    // Create a set of event IDs where college has already applied
    const appliedEventIds = new Set(tickets.map(ticket => String(ticket.eventId)));

    // Attach alreadyApplied key to each event
    const eventsWithStatus = events.map(event => {
        return {
            ...event.toObject(),
            alreadyApplied: appliedEventIds.has(String(event._id))
        };
    });

    res.status(200).json({
        status: "success",
        results: eventsWithStatus.length,
        data: {
            events: eventsWithStatus
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