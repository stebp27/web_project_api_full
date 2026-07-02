const jwt = require("jsonwebtoken");
const ForbiddenError = require("../errors/forbidden-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing Authorization"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return next(new ForbiddenError("Authorization failed"));
  }

  req.user = payload;

  next();
};
