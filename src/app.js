const express = require("express");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const crypto = require("crypto");
const path = require("path");
const morgan = require("morgan");

const log = require("./queries/logQuery");

const routes = require('./routes/index');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  cookieSession({
    name: "session",
    keys: [crypto.randomBytes(16).toString("hex")],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Static files
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/plugins", express.static(path.join(__dirname, "../public/plugins")));
app.use("/dist", express.static(path.join(__dirname, "../public/dist")));
app.use("/node_modules", express.static(path.join(__dirname, "../node_modules")));

// Custom logger
const custom = (tokens, req, res) => {
  if (req.session && req.session.user) {
    const user = req.session.user.email;
    const method = tokens.method(req, res);
    const endpoint = tokens.url(req, res);
    const statusCode = tokens.status(req, res);

    log.addLog(user, method, endpoint, statusCode);
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
};

app.use(morgan(custom));

app.use(routes);

app.get("*", function (req, res) {
  res.status(404).render("404", { title: "404 Error" });
});

module.exports = app;
