const dbUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const limiter = ({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { dbUrl, limiter };
