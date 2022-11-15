const express = require('express');
const router = express.Router();
const {resolvers} = require('../schema.js')

// create routes to CRUD with items
router.get('/', 
 
(req, res) => {
  res.status(200).json('Getting all item listings')
})