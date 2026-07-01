const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-error");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid Data"));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner != req.user._id) {
        throw new ForbiddenError("Forbidden");
      }
      return card.deleteOne();
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Card Not Found"));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Card Not Found"));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid Data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Card Not Found"));
      }
      next(err);
    });
};
