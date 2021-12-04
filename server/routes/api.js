const express = require('express');

const router = new express.Router();

router.get('/', (res, req) => {
  res.status(501).send('Not implemented')
});

router.post('/', (res, req) => {
  res.status(501).send('Not implemented')
});

router.put('/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

router.delete('/:message_id', (res, req) => {
  res.status(501).send('Not implemented')
});

module.exports = router;
