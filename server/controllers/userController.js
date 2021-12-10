const db = require("../models/userModel");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const fetch = require("node-fetch");
require("dotenv").config();

const userController = {};

userController.createUser = (req, res, next) => {
  console.log("We are in the user controller create user middleware");
  const hash = bcrypt.hashSync(req.body.password, 10);
  console.log("Username: ", req.body.username);
  console.log("Password: ", req.body.password);
  if (!req.body.username || !req.body.password)
    return next(
      new Error("Please create an account with correct username and password")
    );
  const text = `INSERT INTO users(username, passcode) VALUES($1, $2);`;
  const values = [req.body.username, hash];
  db.query(text, values)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.verifyUser = (req, res, next) => {
  console.log("We are in the user controller verify user middleware");
  if (!req.body.username)
    return next(new Error("Please input a valid username"));
  const text = `SELECT * FROM users WHERE username=$1;`;
  const values = [req.body.username];
  db.query(text, values)
    .then((response) => {
      if (!response.rows.length) {
        return next(new Error("Username not found"));
      }
      const hash = response.rows[0].passcode;
      if (bcrypt.compareSync(req.body.password, hash)) {
        console.log("password is correct");
        return next();
      } else {
        return next(new Error("Password was incorrect"));
      }
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.userProfile = (req, res, next) => {
  const { session_id } = req.cookies;
  const params = [session_id];
  const text = `SELECT username, nickname, about_me
      FROM users
      WHERE session_id = $1;`;
  db.query(text, params)
    .then((response) => {
      res.locals.profile = response.rows[0];
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.editProfile = (req, res, next) => {
  const { aboutMe, nickname } = req.body;
  const { username } = req.params;
  const params = [aboutMe, nickname, username];
  const text = `UPDATE users SET about_me=$1, nickname=$2 where username=$3;`;
  db.query(text, params)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

userController.oAuth = (req, res, next) => {
  const { code } = req.query;
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      },
      { headers: { accept: "application/json" } }
    )
    .then((res) => {
      console.log(res);
      return res.data.access_token;
    })
    .then((token) => res.redirect("/"))
    .catch((err) => {
      console.log("OAUTH ERROR", err);
      return next(err);
    });
};

module.exports = userController;
