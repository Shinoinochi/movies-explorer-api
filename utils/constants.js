// eslint-disable-next-line no-useless-escape
const regex = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,}\.[a-z]{2,}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*[#]?/;

const BadRequestText = 'Ошибка ввода данных';
const BadRequestIDText = 'Некоректный ID пользователя';
const AccessDeniedText = 'Нет доступа для удаления';
const NotFoundText = 'Неверный ID фильма';
const NotFoundUserError = 'Пользователь не найден';
const NotValidIdText = 'Пользователь не найден';
const ConflictText = 'Пользователь с такой почтой уже существует';
const AuthText = 'Необходима авторизация';
const AuthBadText = 'Неправильная почта или пароль';

module.exports = {
  regex,
  BadRequestText,
  AccessDeniedText,
  NotFoundText,
  NotValidIdText,
  ConflictText,
  BadRequestIDText,
  NotFoundUserError,
  AuthText,
  AuthBadText,
};
