// Async controllerlarni o'raydi — rad etilgan promislarni Express error handlerga uzatadi.
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = { asyncHandler }
