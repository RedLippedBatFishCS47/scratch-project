const express = require('express');

const router = new express.Router();

// Queries DB and responds with a list of objects for all messages
router.get('/', (res, req) => {
  res.status(501).send('Not implemented')
});

// Adds new message from request to DB and respond with the new message
router.post('/', (res, req) => {
  res.status(501).send('Not implemented')
});

// Update a message in the DB and respond with the updated message
router.put('/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

// Delete a message from the DB
router.delete('/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

module.exports = router;
