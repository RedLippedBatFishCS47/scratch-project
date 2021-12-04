const { response } = require('express');
const db = require('../models/userModel');

const chatController = {};

chatController.getMessages = (req, res, next) => {
  console.log('We are in the get messages controller');
  const text = `SELECT * FROM messages`;
  db.query(text)
    .then((response) => {
      res.locals.messages = response.row;
      next();
    })
    .catch((err) => console.error(err));
};

chatController.postMessages = (req, res, next) => {
  console.log('We are in the post messages controller');
  const text = `INSERT into messages (id, user, content, time_stamp) VALUES($1, $2, $3, $4),`;
  const creation_date = new Date().toLocaleString();
  const values = [req.body.id, req.body.user, req.body.content, creation_date];

  db.query(text, values)
    .then((repsonse) => {
      next();
    })
    .catch((err) => {
      console.error(err);
    });
};

chatController.deleteMessage = (req, rescape, next) => {
    console.log('We are in the delete message controller');
    const text = `DELETE FROM messages WHERE id=$1`;
    const values = [req.body.id];

    db.query(text, values)
    .then((repsonse) => {
      next();
    })
    .catch((err) => {
      console.error(err);
    });
};



module.exports = chatController;
