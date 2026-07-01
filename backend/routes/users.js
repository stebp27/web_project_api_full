const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUser,
  editUser,
  editUserAvatar,
  getCurrentUser,
} = require("../controllers/users.js");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editUser,
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
