const express = require('express');

const router = new express.Router();

router.get('/messages', (res, req) => {
  res.status(501).send('Not implemented')
});

router.post('/messages', (res, req) => {
  res.status(501).send('Not implemented')
});

router.put('/messages/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

router.delete('/messages/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

module.exports = router;