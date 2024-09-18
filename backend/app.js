/**
 * app.js
 * Use `app.js` to run your app.
 * To start the server, run: `node app.js`.
 */
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
global.__basedir = __dirname;
const passport = require("passport");
const routes = require("./routes");
const models = require("./model");
let logger = require("morgan");

const {
  adminPassportStrategy,
  operatorPassportStrategy,
  userPassportStrategy,
} = require("./config/passportStrategy");

const app = express();
app.use(require("./utils/response/responseHandler"));
const httpServer = require("http").createServer(app);

const corsOptions = { origin: process.env.ALLOW_ORIGIN };
app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

adminPassportStrategy(passport);
operatorPassportStrategy(passport);
userPassportStrategy(passport);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.use((req, res, next) => {
  next();
});

if (process.env.NODE_ENV !== "test") {
  models.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database connected and models synchronized.");
    })
    .finally(() => {
      app.use(routes);
    });

  httpServer.listen(process.env.PORT, () => {
    console.log(`Your application is running on port ${process.env.PORT}.`);
  });
} else {
  module.exports = app;
}
