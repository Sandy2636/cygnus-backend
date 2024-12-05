const jwt = require("jsonwebtoken");
const { createError } = require("./error.js");
const User = require("../Models/User.js");

const verifyToken = (req, res, next, callback = () => {}) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(createError(401, "You are not Authenticated"));
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is Not Valid"));
    req.user = user;
    const value = callback();
    return next(value);
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      return;
    } else {
      return createError(403, "You are not Authorized");
    }
  });
};

const verifyUserWithAPIKey = (req, res, next) => {
  verifyToken(req, res, next, () => {
    const clientApiKey = req.headers["x-api-key"];
    console.log({ clientApiKey });
    if (clientApiKey === process.env.API_KEY) {
      return;
    } else {
      return createError(403, "You are not Authorized! Invalid API Key");
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyUserWithAPIKey };
