const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // Alternative regex (more specific for test requirements):
        // /^https?:\/\/(www\.)?[a-zA-Z0-9\.\_\-\~\:\/\?\%\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{2,}#?$/i
        return /^https?:\/\/(www\.)?\S{3,}#?$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
