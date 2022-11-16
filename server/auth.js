const dotenv = require("dotenv");
dotenv.config();
const schema = require("./models/model");
const { Users } = schema;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET = process.env.SECRET;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      //if statement: find user in UserDB
      console.log("Checking Profile for google auth: ", profile);
      let username = profile.emails[0].value.slice(
        0,
        profile.emails[0].value.indexOf("@")
      );
      let email = profile.emails[0].value;
      //if user is not found, create a new user in the DB
      const user = await Users.findOne({ username: username, email: email });
      if (user) {
        console.log("User Exists", user);
        cb(null, user);
        return user;
      } else {
        const newUser = await Users.create({
          username: username,
          email: email,
          password: "123",
          oauth: true,
        });
        console.log("create new user", newUser);
        cb(null, newUser);
        return newUser;
      }
      //if user is found return user;

      // return done(null, profile)
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
