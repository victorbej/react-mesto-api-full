const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const validator = require("validator");

const cors = require("cors");
require("dotenv").config();

const { errors, celebrate, Joi } = require("celebrate");
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");
const { login, createUser } = require("./controllers/users.js");
const auth = require("./middlewares/auth.js");
const NotFoundError = require("./utils/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const registerUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, notify) => {
      if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
        return value;
      }
      return notify.message("Неправильный формат");
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", validateUser, login);
app.post("/signup", registerUser, createUser);

app.use(auth);

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);
app.use("/*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
