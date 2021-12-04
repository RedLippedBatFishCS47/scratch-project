const { response } = require('express');
const db = require('../models/userModel');
const uuid = require('uuid');
const { terserMinify } = require('terser-webpack-plugin');

const chatController = {};

chatController.getMessages = (req, res, next) => {
  console.log('We are in the get messages controller');
  const text = `SELECT * FROM messages;`;
  db.query(text)
    .then((response) => {
      res.locals.messages = response.rows;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

chatController.postMessages = (req, res, next) => {
  console.log('We are in the post messages controller');
  const text = `INSERT into messages (username, content, time_stamp, session_id) VALUES($1, $2, $3, $4);`;
  const creation_date = new Date().toLocaleString();
  const values = [req.body.username, req.body.content, creation_date, req.cookies.session_id];

  db.query(text, values)
    .then((response) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

//update messages middleware
chatController.updateMessage = (req, res, next) => {
  console.log('We are in the update message controller');
  const text = `UPDATE messages SET content=$1 WHERE id=$2;`;
  const values = [req.body.content, req.params.message_id];

  db.query(text, values)
    .then((response) => {
      res.locals.updatedMessage = response.rows;
      next();
    })
  .catch((err) => {
      console.error(err);
      next(err);
    });
}

chatController.deleteMessage = (req, res, next) => {
  console.log('We are in the delete message controller');
  const text = `DELETE FROM messages WHERE id=$1;`;
  const values = [req.params.message_id];

  db.query(text, values)
    .then((response) => {
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

chatController.setIfNotExistSessionCookie = (req, res, next) => {
  if (!req.cookies.session_id) {
    res.cookie('session_id', uuid.v4(), {
      httpOnly: true,
      secure: true,
    });
  }
  next();
};

chatController.authenticateSessionCookie = (req, res, next) => {
  if (!req.cookies.session_id) {
    return next(new Error("Permission denied"));
  }
  const text = `
    SELECT * FROM messages
    WHERE id = $1
    AND session_id = $2
  ;`;
  values = [req.params.message_id, req.cookies.session_id];
  db.query(text, values)
    .then((response) => {
      if (response.rows.length) {
        return next();
      }
      else {
        return next(new Error("Permission denied"));
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

module.exports = chatController;
