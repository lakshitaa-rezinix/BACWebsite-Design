const mongoose = require("mongoose");

// A malformed :id (e.g. /api/jobs/abc) makes Mongoose throw a CastError, which
// the routes' catch blocks report as a 500 "Server error". It is a client
// mistake, so reject it up front with a 400.
module.exports = function validateId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  next();
};
