const dotenv = require('dotenv')
const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schema')

dotenv.config();
require('./auth');

const app = express();
const port = 3000;


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
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure',
}))

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong..')
})
// serving protected site upon login
app.get('/protected', isLoggedIn, (req, res) => {
  res.send('Hello!');
});

startApolloServer(typeDefs, resolvers);

app.listen(port, ()=> {
  console.log(`Server is listening at https://localhost:${port}`);
});

// next steps install express-session, continue youtube 15:26