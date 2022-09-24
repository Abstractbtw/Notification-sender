
module.exports = (req, res, next) => {
  const err = new Error("Server error")
  err.status = 500
  next(err)
}