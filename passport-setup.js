const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user); 
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, user, cb) {
    return cb(null, user);
  }
));

