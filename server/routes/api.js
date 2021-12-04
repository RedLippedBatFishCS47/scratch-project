const express = require('express');
const chatController = require('../controllers/chatController');

const router = new express.Router();

// Queries DB and responds with a list of objects for all messages
router.get('/', chatController.getMessages, (req, res) => {
  res.status(200).json(res.locals.messages);
});

// Adds new message from request to DB and respond with the new message
router.post('/', chatController.postMessages, (req, res) => {
  res.status(200).redirect('/');
});

// Update a message in the DB and respond with the updated message
router.put('/:message_id', (req, res) => {
  res.status(501).send('Not implemented');
});

// Delete a message from the DB
router.delete('/:message_id', chatController.deleteMessage, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
