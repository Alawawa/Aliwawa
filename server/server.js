const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session');
// const itemsRoute = require('./routes/items')
const { ApolloServer } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schema')
const passport = require('passport');
const mongoose = require('mongoose');

dotenv.config();

// connect to mongodb 
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'aliwawaDb',
})
  .then(() => console.log('Connected to mongoose.'))
  .catch((err) => console.log('(Error connecting to MongoDB) Err: ', err))

const SECRET = process.env.SECRET;
require('./auth');

const app = express();
const port = 3000;

// connecting with express-session below
app.use(session({ secret: SECRET }));
app.use(passport.initialize());
app.use(passport.session());

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start();
  server.applyMiddleware({app, path: "/api"});
}

// controller or middleware for logged in after google 
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(express.json());

//serve
app.use(express.static("./build"));

// oauth serve
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// Google Authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure',
}))

// Twitter Authentication
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure', 
  // we could redirect for failure, 
  // then include a callback function as a third parameter to 
  // res.redirect to localhost:3000 instead of redirecting to protected?
}))

// If failed or success, do the following below
app.get('/auth/failure', (req, res) => {
  res.send('something went wrong..')
})
// serving protected site upon login
app.get('/protected', isLoggedIn, (req, res) => {
  console.log(req.user)
  res.send(`Hello ${req.user.username}!`);
});

// For logout, delete session
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
})

// routing to items endpoint
// app.use('/items', itemsRoute);

startApolloServer(typeDefs, resolvers);

module.exports = app.listen(port, ()=> {
  console.log(`Server is listening at https://localhost:${port}`);
});

// next steps install express-session, continue youtube 15:26