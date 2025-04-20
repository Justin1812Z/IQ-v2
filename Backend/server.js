const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
const cardModel = require("./models/cardModel");
const setModel = require('./models/setModel');
const userModel = require('./models/userModel');
const session = require('express-session');

app.use(express.json());
app.use(
    session({
        secret: "your-secret-key", // Replace with a secure secret key
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, sameSite: "lax" }, // Set `secure: true` if using HTTPS
    })
)


const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
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
    console.log("gettign id")
    const title = getTitle(urlId);

    

    cardModel
    .find( { setId: urlId })
    .then((cards) => {
        res.json({ cards })
    })
    .catch((err) => next(err));
})

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
  


app.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    userModel.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User does not exist" });
            }

            user.comparePassword(password)
                .then(result => {
                    if (result) {
                        // Successful login
                        req.session.user = user; // Store user in session
                        console.log("session user:", req.session.user);
                        res.status(200).json({ message: "Login successful", userId: user._id });
                    } else {
                        // Wrong password
                        res.status(401).json({ message: "Invalid password" });
                    }
                })
                .catch(err => {
                    // Handle errors from comparePassword
                    console.error("Error comparing password:", err.message);
                    res.status(500).json({ message: "An error occurred while processing your request" });
                });
        })
        .catch(err => next(err));
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).json({ message: "Logout successful" });
    });
});

app.get("/session", (req, res) => {
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

app.get("/profile/:userId", (req, res, next) => {
    const userId = req.params.userId; // Extract userId from params
    console.log("Fetching user with ID:", userId);

    userModel
        .findById(userId) // Use findById to fetch a single user by _id
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user); // Return the user object directly
        })
        .catch((err) => {
            console.error("Error fetching user:", err.message);
            next(err);
        });
});

//app.listen(5000, () => {console.log("server is listening on port 5000")})