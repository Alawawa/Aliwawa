const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schema = mongoose.Schema;

dotenv.config();
const dbURI = process.env.DATABASE_URI;


// connect to mongodb 
mongoose.connect(dbURI, {
  dbName: 'aliwawaDb',
})
  .then(() => console.log('Connected to mongoose.'))
  .catch((err) => console.log('(Error connecting to MongoDB) Err: ', err))

// declare schemas for database
const listingSchema = new Schema({
  id: {type: Number, required: true},
  itemName: {type: String, required: true},
  itemPrice: {type: Number, required: true},
  purchased: {type: Boolean, required: true},
  tags: {type: Array, required: true},
  sellerID: {type: Number, required: true}
})

const userSchema = new Schema({
  id: {type: Number, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  oauth: {type: Boolean, required: true}
})

// declare variables for new mongoDB models
const Listings = mongoose.model('listings', listingSchema, 'listings')
const Users = mongoose.model('users', userSchema, 'users')

const schemas = {'Listings': Listings, 'Users': Users}

// mongoose causes jest to hang since the connection is never closed
// mongoose.connection.close();

module.exports = schemas