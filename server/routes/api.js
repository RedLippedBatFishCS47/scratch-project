const express = require('express');
const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController');

const router = new express.Router();

// Queries DB and responds with a list of objects for all messages
// also sets a session cookie if one does not exist
router.get('/messages/',
  chatController.getMessages,
  (req, res) => {
    res.status(200).json(res.locals.messages);
  }
);

// Adds new message from request to DB and respond with the new message
router.post('/messages', chatController.postMessages, (req, res) => {
  res.status(200).redirect('/');
});

// Update a message in the DB and respond with the updated message
router.put('/messages/:message_id',
  chatController.authenticateSessionCookie,
  chatController.updateMessage,
  (req, res) => {
    res.status(200).json(res.locals.updatedMessage);
  }
);

// Delete a message from the DB
router.delete('/messages/:message_id',
  chatController.authenticateSessionCookie,
  chatController.deleteMessage,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post('/register', userController.createUser,
  (req, res) => {
    res.sendStatus(200).redirect('/login');
  }
);

router.post('/login', userController.verifyUser,
  (req, res) => {
    res.sendStatus(200).redirect('/');
  }
);

module.exports = router;
