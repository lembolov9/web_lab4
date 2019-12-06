const express = require('express');
const mongoose = require('mongoose');
const index_router =  require('./src/routes/index');
const {port} = require('./src/config')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    next();
});

const mongoDB = "mongodb://LAB_4:12345678@127.0.0.1:27017";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('DB connected');
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      app.use('/', index_router);
      app.listen(port, () => {
          console.log('We are live on ' + port);
      });
    })
  .catch((err) => console.log('DB error', err));

module.exports = app