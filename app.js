require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { dbUrl } = require('./utils/config');
const limiter = require('./utils/limiterConfig');

const limit = rateLimit(limiter);

const app = express();

const { PORT = 3000, BD_URL = dbUrl } = process.env;

mongoose.connect(BD_URL, {
  useNewUrlParser: true,
});
app.use(cors({ origin: ['http://localhost:3001', 'http://shinoinochi.movies.nomoredomainsicu.ru', 'https://shinoinochi.movies.nomoredomainsicu.ru'] }));
app.use(requestLogger);
app.use(limit);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use('*', () => {
  throw new NotFoundError('Здесь ничего нет');
});
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Запуск на порте: ${PORT}`);
});
