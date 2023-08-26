const mongoose = require('mongoose');
const validator = require('validator');

const movieScheme = new mongoose.Schema(
  {
    country: {
      type: String,
      require: [true, 'Поле country должно быть заполнено'],
    },
    director: {
      type: String,
      require: [true, 'Поле director должно быть заполнено'],
    },
    duration: {
      type: Number,
      require: [true, 'Поле duration должно быть заполнено'],
    },
    year: {
      type: String,
      require: [true, 'Поле year должно быть заполнено'],
    },
    description: {
      type: String,
      require: [true, 'Поле description должно быть заполнено'],
    },
    image: {
      type: String,
      validate: {
        validator: (URL) => validator.isURL(URL),
        message: 'Некорректный URL',
      },
      require: [true, 'Поле image должно быть заполнено'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (URL) => validator.isURL(URL),
        message: 'Некорректный URL',
      },
      require: [true, 'Поле trailerLink должно быть заполнено'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (URL) => validator.isURL(URL),
        message: 'Некорректный URL',
      },
      require: [true, 'Поле thumbnail должно быть заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: [true, 'Поле owner должно быть заполнено'],
    },
    movieId: {
      type: Number,
      require: [true, 'Поле movieId должно быть заполнено'],
    },
    nameRU: {
      type: String,
      require: [true, 'Поле nameRU должно быть заполнено'],
    },
    nameEN: {
      type: String,
      require: [true, 'Поле nameEN должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieScheme);
