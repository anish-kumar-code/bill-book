
const Employee = require("../../models/user");
const AppError = require("../../utils/AppError");
const catchAsync = require("../../utils/catchAsync");

/**
 * @desc    Generates a unique employee number, e.g., EMP-54321
 * @returns {Promise<string>} A unique employee number.
 */
const generateUniqueEmployeeNumber = async () => {
    const employeeCount = await Employee.countDocuments();
    const nextSequenceNumber = employeeCount + 1;
    const paddedNumber = String(nextSequenceNumber).padStart(5, '0');
    const employeeNo = `EMP-${paddedNumber}`;

    return employeeNo;
};


/**
 * @desc    Create a new employee
 * @route   POST /api/v1/employees
 */
exports.createEmployee = catchAsync(async (req, res, next) => {
    // Check for duplicate email before creating
    const { name, email, mobileNo, address } = req.body
    const existingEmployee = await Employee.findOne({ mobileNo });
    if (existingEmployee) {
        return next(new AppError("An employee with this mobile No already exists.", 409));
    }

    // Generate a unique employee number
    const employeeNo = await generateUniqueEmployeeNumber();

    // Create the new employee
    const newEmployee = await Employee.create({
        name, email, mobileNo, address, employeeNo,
    });

    res.status(201).json({
        status: "success",
        data: {
            employee: newEmployee,
        },
    });
});


/**
 * @desc    Get all employees
 * @route   GET /api/v1/employees
 */
exports.getAllEmployees = catchAsync(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).json({
        status: "success",
        results: employees.length,
        data: {
            employees,
        },
    });
});


/**
 * @desc    Get a single employee by ID
 * @route   GET /api/v1/employees/:id
 */
exports.getEmployeeById = catchAsync(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            employee,
        },
    });
});


/**
 * @desc    Update an employee
 * @route   PATCH /api/v1/employees/:id
 */
exports.updateEmployee = catchAsync(async (req, res, next) => {
    // Prevent employeeNo from being updated
    delete req.body.employeeNo;

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            employee,
        },
    });
});


/**
 * @desc    Delete an employee
 * @route   DELETE /api/v1/employees/:id
 */
exports.deleteEmployee = catchAsync(async (req, res, next) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
        return next(new AppError("No employee found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: employee,
    });
});