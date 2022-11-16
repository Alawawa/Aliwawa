const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schema = mongoose.Schema;

// declare schemas for database
const listingSchema = new Schema({
  itemName: {type: String, required: true},
  itemPrice: {type: Number, required: true},
  itemDesc: {type: String, required: true},
  itemPic: {type: String, required: true},
  purchased: {type: Boolean, required: true},
  tags: {type: Array, required: true},
  sellerId: {type: String, required: true}
})

const userSchema = new Schema({
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  oauth: {type: Boolean, required: true}
})

const transactionsSchema = new Schema({
  items: {type: Array, required: true},
  sellerId: {type: String, required: true},
  buyerId: {type: String, required: true}
})

const cartSchema = new Schema({
  buyerId: {type: String, required: true},
  items: {type: Array, required: true}
});

// declare variables for new mongoDB models
const Listings = mongoose.model('listings', listingSchema, 'listings')
const Users = mongoose.model('users', userSchema, 'users')
const Transactions = mongoose.model('transactions', transactionsSchema, 'transactions')
const Cart = mongoose.model('cart', cartSchema, 'cart');

const schemas = {'Listings': Listings, 'Users': Users, 'Transactions': Transactions, 'Cart': Cart}

module.exports = schemas