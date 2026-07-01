require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT = 3000 } = process.env;
const { login, createUser } = require("./controllers/users.js");
const auth = require("./middlewares/auth.js");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");
const NotFoundError = require("./errors/not-found-err.js");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const app = express();

const allowedOrigins = [
  "https://www.around19.mooo.com",
  "http://www.around19.mooo.com",
  "https://around19.mooo.com",
  "http://around19.mooo.com",
  "http://localhost:3000",
];

app.use(cors({ origin: allowedOrigins }));
app.options("*", cors({ origin: allowedOrigins }));

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((e) => {
    console.log("Error: " + e.message);
  });

app.use(express.json());

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  createUser,
);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Page not found
app.use((req, res, next) => {
  return next(new NotFoundError("Page Not Found"));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Internal server Error" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
