const dotenv = require('dotenv')
dotenv.config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: SECRET,
    callbackURL: "http://www.example.com/auth/google/callback",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return done(err, profile)
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})