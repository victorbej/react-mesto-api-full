const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");
const BadRequestError = require("../utils/BadRequestError");
const UnauthError = require("../utils/UnauthError");
const UniqueError = require("../utils/UniqueError");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("Данные о пользователях не найдены!");
      } else {
        res.send(users);
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (req.body.password.length < 8) {
    throw new BadRequestError(
      "Ошибка валидации. Пароль должен состоять из 8 или более символов",
    );
  } else {
    bcrypt
      .hash(password.toString(), 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then(() => {
        res.status(200).send({ email, password: undefined });
      })
      .catch((err) => {
        if (err.name === "MongoError" || err.code === 11000) {
          next(new UniqueError("Данный email уже зарегистрирован"));
        } else if (err.name === "ValidationError") {
          next(
            new BadRequestError("Ошибка валидации. Введены некорректные данные"),
          );
        } else {
          next(err);
        }
      });
  }
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, opts })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, opts })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthError("Авторизация не пройдена!");
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" },
      );
      res.send({ token });
    })
    .catch(next);
};
