const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => 'This is not a valid email!',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        // Alternative regex (more specific for test requirements):
        // /^https?:\/\/(www\.)?[a-zA-Z0-9\.\_\-\~\:\/\?\%\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{2,}#?$/i
        return /^https?:\/\/(www\.)?\S{3,}#?$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
