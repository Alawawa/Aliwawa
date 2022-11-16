const db = require('./models/model')
const { ApolloServer, gql } = require('apollo-server-express');
const schema  = require('./models/model')
const {Listings, Users, Transactions, Cart} = schema;

console.log("Checking schemas :", Listings)

const typeDefs = gql`
    type Query {
        getUser(id: ID, username: String): User!
        getAllUsers: [User!]
        getAllListings: [Listing!]
    }

    type Mutation {
        login(email: String, password: String): User!
        signup(email: String, username: String, password: String): User!
        createListing(username: String, listing: ListingType): Listing!
        addToCart(username: String, cart: CartType): Cart!
        checkoutCart: Boolean!
    }

    input ListingType {
      itemName: String!
      itemPrice: Int!
      itemDesc: String!
      itemPic: String!
      tags: [String],
    }

    input CartType {
      items: [ListingType]
    }

    type Cart {
      id: ID!
      buyerId: String!
      items: [Listing]
    }


    type User {
      id: ID!
      email: String!
      username: String!
      password: String
      oauth: Boolean!
      listings: [Listing!]
      orders: [Listing]
      cart: Cart
    }

    type Transaction {
      id: ID!
      buyer: User!,
      seller: User!
      item: Listing!
    }


    type Listing {
        id: ID!
        itemName: String!
        itemPrice: Int!
        itemPic: String!
        itemDesc: String!
        purchased: Boolean!
        tags: [String!]
        sellerId: String!
        seller: User!
    }
`


const resolvers = {
  Query: {
    getUser: async (parent, {id, username}, context, info) => {
      const userInfo = await Users.findOne({id: id, username: username});
      return userInfo
    },
    getAllUsers: async(parent, args, context, info) => {
      const users = await Users.find({});
      return users;
    },
    getAllListings: async(parent, args, context, info) => {
      const listings = await Listings.find({});
      return listings;
    }
  },
  Mutation : {
    login: async (parent, args, context, info) => {
      const { email, password } = args;
      const user = await Users.findOne({email: email, password: password})
      return user;
    },
    signup: async (parent, args, context, info) => {
      const { email, username, password } = args;
      const newUser = await Users.create({email: email, username: username, password: password, oauth: false})
      return newUser;
    },
    createListing: async (parent, args, context, info) => {
      const {username, listing} = args;
      const listingToCreate = await Listings.create({...listing, purchased : false, sellerId: username})
      return listingToCreate;
    },
    addToCart: async (parent, args, context, info) => {
      const {username, cart} = args;
      //update the cart with the username
      cart.buyerId = username;
      const updatedCart = await Cart.findOneAndUpdate({buyerId: username}, cart, {upsert: true, returnDocument: 'after'});
      return updatedCart;
    },
  },
  User: {
    listings: async (parent, args, context, info) => {
      const listings = await Listings.find({sellerId: parent.username})
      return listings;
    }
  },
  Listing: {
    seller: async (parent, args, context, info) => {
      const seller = await Users.findOne({username: parent.sellerId})
      return seller;
    },
  }
}

module.exports = {typeDefs, resolvers};