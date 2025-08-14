const Event = require("../../models/event");
const Ticket = require("../../models/ticket");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");


/**
 * @desc    Generates a unique, random ticket number in the format TKT-XXXXX
 * @returns {Promise<string>} A unique ticket number.
 */
const generateUniqueTicketNumber = async () => {
    let ticketNo;
    let isUnique = false;

    while (!isUnique) {
        // Generate a random 5-digit number
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        ticketNo = `TKT-${randomNumber}`;

        // Check if this ticket number already exists
        const existingTicket = await Ticket.findOne({ ticketNo });
        if (!existingTicket) {
            isUnique = true;
        }
    }
    return ticketNo;
};

/**
 * @desc    Create a new ticket for an event
 * @route   POST /api/v1/tickets
 */
exports.createTicket = catchAsync(async (req, res, next) => {
    const { eventId, name, email, mobileNo, numberOfEmployee } = req.body;

    const collegeId = req.newCollege._id;

    // 1. Check if the eventId is provided and if the event actually exists
    if (!eventId) {
        return next(new AppError("An event ID is required to create a ticket.", 400));
    }
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
        return next(new AppError("No event found with that ID. Cannot create ticket.", 404));
    }

    // 2. Generate a unique ticket number
    const ticketNo = await generateUniqueTicketNumber();

    // 3. Create and save the new ticket
    const newTicket = await Ticket.create({
        eventId,
        collegeId,
        name,
        email,
        mobileNo,
        numberOfEmployee,
        ticketNo, // Add the generated ticket number
    });

    res.status(201).json({
        status: "success",
        data: {
            ticket: newTicket,
        },
    });
});

/**
 * @desc    Get all tickets (can be filtered by eventId)
 * @route   GET /api/v1/tickets
 * @example GET /api/v1/tickets?eventId=60d21b4667d0d8992e610c85
 */
exports.getAllTickets = catchAsync(async (req, res, next) => {
    const filter = {};
    // Allow filtering tickets by the event they belong to
    if (req.query.eventId) {
        filter.eventId = req.query.eventId;
    }

    const tickets = await Ticket.find(filter).populate('eventId'); // Populate event details

    res.status(200).json({
        status: "success",
        results: tickets.length,
        data: {
            tickets,
        },
    });
});


/**
 * @desc    Get a single ticket by its ID
 * @route   GET /api/v1/tickets/:id
 */
exports.getTicketById = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id).populate('eventId');

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



/**
 * @desc    Get a single ticket by its ID
 * @route   GET /api/v1/tickets/:id
 */
exports.getTicketByCollegeId = catchAsync(async (req, res, next) => {

    const collegeId = req.newCollege._id;

    const ticket = await Ticket.find({collegeId}).populate("eventId")

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


/**
 * @desc    Update a ticket
 * @route   PATCH /api/v1/tickets/:id
 */
exports.updateTicket = catchAsync(async (req, res, next) => {
    // Prevent ticketNo and eventId from being updated
    // delete req.body.ticketNo;
    // delete req.body.eventId;

    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId, req.body, {
        new: true,
    });

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


/**
 * @desc    Delete a ticket
 * @route   DELETE /api/v1/tickets/:id
 */
exports.deleteTicket = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);

    if (!ticket) {
        return next(new AppError("No ticket found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});