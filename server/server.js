const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();
const process = require('process');
const path = require('path');
const apiRouter = require('./routes/api');
const chatController = require('./controllers/chatController');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.get('/',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, '../index.html'));
    }
  );

  app.use('/build', express.static(path.resolve(__dirname, '../build')))
}

//GET all the messages /api

//POST new message /api

//PUT/DELETE for a message -> /api/:message_Id

//username is set in the client, so no route is needed until auth

//deletion only implemented after auth?
//implement user sessions: automatically given when accessing client
//can only delete messages whose session ID matches the client's

app.use('/api', apiRouter);

app.use((req, res) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send(`Internal Server Error: ${err.message}`)
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
