import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
// const { ApolloServer } = require('apollo-server-express');
import { ApolloServer } from 'apollo-server-express';

dotenv.config();
const app = express();
const port = 8000;

app.use(express.json());

//serve
app.use(express.static("./build"));


app.listen(port, ()=> {
  console.log(`Server is listening at https://localhost:${port}`);
});