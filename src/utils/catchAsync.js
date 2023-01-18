const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err, 'ERRORRR');
    return next(err);
  });
};

module.exports = catchAsync;
