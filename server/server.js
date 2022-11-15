// import dotenv from 'dotenv';
const dotenv = require('dotenv')
// import express from 'express';
const express = require('express')
const { ApolloServer } = require('apollo-server-express');
// import { ApolloServer } from 'apollo-server-express';
const {typeDefs, resolvers} = require('./schema')

dotenv.config();
const app = express();
const port = 3000;


async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start();
  server.applyMiddleware({app, path: "/api"});
}


app.use(express.json());

//serve
app.use(express.static("./build"));

startApolloServer(typeDefs, resolvers);

app.listen(port, ()=> {
  console.log(`Server is listening at https://localhost:${port}`);
});