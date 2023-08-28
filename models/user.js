const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-err');
const { AuthBadText } = require('../utils/constants');

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Поле email должно быть заполнено'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Поле password должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      require: [true, 'Поле name должно быть заполнено'],
      minlength: [2, 'Минимальное длина поля name 2 символа'],
      maxlength: [30, 'Максимальная длина поля name 30 символов'],
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userScheme.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(AuthBadText);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(AuthBadText);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userScheme);
