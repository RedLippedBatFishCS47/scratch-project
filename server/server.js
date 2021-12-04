const express = require ('express');
const app = express ();
const process = require('process');
const path = require('path');
const apiRouter = require('./routes/api');
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  })
  app.use('/build', express.static(path.resolve(__dirname, '../build')))
}

app.use((req, res) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send(`Internal Server Error: ${err.message}`)
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));