// This is also a middleware that is check if user role is admin or user
module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
};
