const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

const deleteGeneric = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Document deleted successfully',
      data: doc || null,
    });
  });

module.exports = deleteGeneric;
