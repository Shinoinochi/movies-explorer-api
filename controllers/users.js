const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const {
  BadRequestText, BadRequestIDText, NotFoundUserError, ConflictText,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError(NotFoundUserError));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(BadRequestIDText));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => {
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestText));
      } else if (err.code === 11000) {
        next(new ConflictError(ConflictText));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '30d' });
      res.send({ token });
    })
    .catch(next);
};

const editUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BadRequestText));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  editUser,
  createUser,
  login,
};
