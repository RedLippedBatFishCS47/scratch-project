const db = require("../models/userModel");
const uuid = require("uuid");
const moment = require('moment');
const events = require('events');


const messageEventEmitter = new events.EventEmitter();

const chatController = {};

chatController.getMessages = (req, res, next) => {
  console.log("We are in the get messages controller");
  const text = `
    SELECT * FROM messages
    INNER JOIN users ON messages.username = users.username
    ORDER BY messages.id ASC
  ;`;
  db.query(text)
    .then((response) => {
      res.locals.messages = response.rows.map((entry) => {
        const permission = entry.session_id === req.cookies.session_id;
        const { id, content, time_stamp, username, edit } = entry;
        return {
          id,
          content,
          time_stamp,
          username,
          permission,
          edit,
        };
      });
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

chatController.postMessages = (req, res, next) => {
  console.log("We are in the post messages controller");
  const text = `INSERT into messages (username, content, time_stamp) VALUES($1, $2, $3);`;
  const creation_date = new Date().toLocaleString();
  const values = [req.body.username, req.body.content, creation_date];

  db.query(text, values)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

//update messages middleware
chatController.updateMessage = (req, res, next) => {
  console.log("We are in the update message controller");
  console.log(req.body);
  const text = `UPDATE messages SET content=$1, edit=$2 WHERE id=$3;`;
  const creation_date = new Date().toLocaleString();
  const values = [req.body.content, creation_date, req.params.message_id];

  db.query(text, values)
    .then((response) => {
      // console.log("this is response rows", response.rows);
      // res.locals.updatedMessage = response.rows;
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

chatController.deleteMessage = (req, res, next) => {
  console.log("We are in the delete message controller");
  const text = `DELETE FROM messages WHERE id=$1;`;
  const values = [req.params.message_id];

  db.query(text, values)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

chatController.setSessionCookie = (req, res, next) => {
  const session_id = uuid.v4();
  const text = `
    UPDATE users
    SET session_id=$1
    WHERE username=$2
  ;`;
  const values = [session_id, req.body.username];

  db.query(text, values)
    .then((response) => {
      res.cookie("session_id", session_id, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("username", req.body.username);
      return next();
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

chatController.authorizeSession = (req, res, next) => {
  if (!req.cookies.session_id) {
    return next(new Error("Permission denied"));
  }
  const text = `
    SELECT * FROM users
    WHERE session_id = $1
  ;`;
  values = [req.cookies.session_id];
  db.query(text, values)
    .then((response) => {
      if (response.rows.length) {
        return next();
      } else {
        return next(new Error("Permission denied"));
      }
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

chatController.authorizeSessionForMessage = (req, res, next) => {
  if (!req.cookies.session_id) {
    return next(new Error("Permission denied"));
  }
  const text = `
    SELECT * FROM messages
    INNER JOIN users ON messages.username = users.username
    WHERE messages.id = $1
    AND users.session_id = $2
  ;`;
  values = [req.params.message_id, req.cookies.session_id];
  db.query(text, values)
    .then((response) => {
      if (response.rows.length) {
        return next();
      } else {
        return next(new Error("Permission denied"));
      }
    })
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};


chatController.longPolling = (req, res, next) => {
  console.log(`${moment()} - Waiting for new message...`);
  messageEventEmitter.once('newMessage', () => {
    return next();
  })
}

chatController.triggerLongPoll = (req, res, next) => {
  console.log('reached trigger for long polling');
  messageEventEmitter.emit('newMessage');
  return next();
}

module.exports = chatController;
