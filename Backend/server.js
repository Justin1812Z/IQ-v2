const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
const cardModel = require("./models/cardModel");
const setModel = require('./models/setModel');


const corsOptions = {
    origin: ["http://localhost:5173"],
};


let port = 5000
let url = 'mongodb+srv://G7:ITSC-4155@g7-project.pitrg9x.mongodb.net/G7?retryWrites=true&w=majority'
let host = 'localhost';

app.use(cors(corsOptions));

mongoose.connect(url)
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('server is running on port', port);
    })
})
.catch(err=>console.log(err.message));

app.get("/set", (req, res, next) => {
    // const url = req.url;
    // const arr = url.split("/");
    // const setId = arr[arr.length - 1];
    cardModel
      .find()
      .then((cards) => {
        res.json({ cards });
      })
      .catch((err) => next(err));
  })

app.get("/sets", (req, res, next) => {
    setModel
    .find()
    .then((sets) => {
        res.json({ sets })
    })
    .catch((err) => next(err));
})

app.get("/flashcards/:id", (req, res, next) => {
    const url = req.url;
    const arr = url.split("/");
    const urlId = arr[arr.length - 1];

    cardModel
    .find( { setId: urlId })
    .then((cards) => {
        res.json({ cards })
    })
    .catch((err) => next(err));
})
  

app.get("/apis", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
    console.log("testing")
})

//app.listen(5000, () => {console.log("server is listening on port 5000")})