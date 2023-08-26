const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const AccessDeniedError = require('../errors/access-denied-err');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const ownerId = req.user;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка ввода данных'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Неверный ID фильма');
      }
      if (owner !== String(movie.owner)) {
        throw new AccessDeniedError('Нет доступа для удаления');
      } else {
        return movie.deleteOne();
      }
    })
    .then((deleted) => {
      res.send({ deleted });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
