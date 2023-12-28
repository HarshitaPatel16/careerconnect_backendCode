var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var FormData = require('form-data');
var fs = require('fs');
const multer = require('multer');
const formidable = require('formidable');



const db = require("./config/db");

var fileupload = require("express-fileupload");
const loginRouter = require("./routes/loginroutes");
const PostRouter = require("./routes/postrouters");
const LikeRouter = require("./routes/likeroutes");
const CommentRouter = require("./routes/commenrroutes");
const StoryRouter = require("./routes/storyrouters");




var app = express();
app.use(fileupload());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var form = new FormData();

// Set up storage for uploaded files (you can customize this as needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/user", loginRouter);
app.use("/api/post", PostRouter);
app.use("/api/like", LikeRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/story", StoryRouter);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
