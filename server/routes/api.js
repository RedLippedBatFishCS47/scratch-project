const express = require("express");
const chatController = require("../controllers/chatController");
const userController = require("../controllers/userController");
// const EventEmitter = require('../events')
const events = require("events");
const { decodeBase64 } = require("bcryptjs");
const router = new express.Router();
require('dotenv').config();

// Queries DB and responds with a list of objects for all messages
// also sets a session cookie if one does not exist
router.get(
  "/messages/",
  chatController.authorizeSession,
  chatController.getMessages,
  (req, res) => {
    res.status(200).json(res.locals.messages);
  }
);

router.get(
  "/messagesLongPolling/",
  chatController.longPolling,
  chatController.getMessages,
  (req, res) => {
    res.status(200).json(res.locals.messages);
  }
);

// Adds new message from request to DB and respond with the new message
router.post(
  "/messages",
  chatController.postMessages,
  chatController.triggerLongPoll,
  chatController.authorizeSession,
  (req, res) => {
    res.status(200).redirect("/"); //delete after long polling
  }
);

// Update a message in the DB and respond with the updated message
router.put(
  "/messages/:message_id",
  chatController.authorizeSessionForMessage,
  chatController.updateMessage,
  chatController.triggerLongPoll,
  (req, res) => {
    res.sendStatus(200);
  }
);

// Delete a message from the DB
router.delete(
  "/messages/:message_id",
  chatController.authorizeSessionForMessage,
  chatController.deleteMessage,
  chatController.triggerLongPoll,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post(
  "/register",
  userController.createUser,
  chatController.setSessionCookie,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post(
  "/login",
  userController.verifyUser,
  chatController.setSessionCookie,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  "/profiles/:username", 
  userController.userProfile, 
  (req, res) => {
  res.status(200).json(res.locals.profile);
});

router.patch(
  "/profiles/:username", 
  userController.editProfile, 
  (req, res) => {
  res.sendStatus(200);
});

router.get(
  "/auth",
  (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=read:user`)
  }
)

router.get("/oauth",
  userController.oAuth,
  (req, res) => {
    res.sendStatus(200);
  }
)

module.exports = router;
