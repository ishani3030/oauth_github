const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require('cookie-session');

require("./passport-setup");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
    name: 'learning-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus('401')
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send("hello world"));
app.get('/failed', (req, res) => res.send("You failed to login"));
app.get('/success', isLoggedIn, (req, res) => res.send(`Welcome ${req.user.displayName}`));

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/success');
    });


app.get('/logout', isLoggedIn, (req, res) => {
    req.session = null;
    req.logout();
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.listen(3000, () => console.log("server running on 3000!"))