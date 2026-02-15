import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import meRouter from "./routes/me.js";
import session from "express-session";

const port = 3000

// var usersRouter = require('./routes/users');

const app = express();
const sess = session({
  secret: 'keyboard cat',
  // resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(sess);

app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use('/me', meRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

export default app;
