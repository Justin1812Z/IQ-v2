//const flashcardModel = require("../models/flashcardModel");
const setModel = require("../models/setModel");
const cardModel = require("../models/cardModel");
const { spawn } = require("child_process");
const fs = require("fs");
//const { JSDOM } = require("jsdom");

//Returns all flashcards
exports.index = (req, res, next) => {
    // const url = req.url;
    // const arr = url.split("/");
    // const setId = arr[arr.length - 1];
    cardModel
      .find()
      .then((cards) => {
        res.json({ cards });
      })
      .catch((err) => next(err));
  }

//Return all sets
exports.allSets = (req, res, next) => {
    setModel
    .find()
    .then((sets) => {
        res.json({ sets })
    })
    .catch((err) => next(err));
}

//Returns all flashcards in a set
exports.flashcardSet =  (req, res, next) => {
    const url = req.url;
    const arr = url.split("/");
    const urlId = arr[arr.length - 1];
    console.log("gettign id")
    const title = getTitle(urlId);

    cardModel
    .find( { setId: urlId })
    .then((cards) => {
        res.json({ cards })
    })
    .catch((err) => next(err));
}

//Gets the title of the set
function getTitle(id) {
    app.get("title/:id", (req, res, next) => {
        setModel
        .find({setId: id})
        .then((set) => {
            console.log(set);
            return set.setName;
        })
    })
}