const db = require('./models/itemModel')
const { ApolloServer, gql } = require('apollo-server-express');
const { Users, Listings } = require("./db.js");

const typeDefs = gql`
    type Query {
        user(id: ID!): User!
        users: [User!]
        getAllListings: [Listing!]
    }

    type Mutation {
        login(email: String, password: String): User!
        signup(email: String, password: String): User!
        createListing(username: String, listing: ListingType): Listing!
    }

    input ListingType {
      itemName: String!
      itemPrice: Int!
      itemDesc: String!
      tags: [String],
    }

    type User {
      id: ID!
      email: String!
      username: String!
      password: String
      oauth: Boolean!
      listings: [Listing!]
      orders: [Listing]
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
        sellerID: ID!
        seller: User!
    }
`


const resolvers = {
  Query: {
    user: async ({ id }) => {
      const userInfo = await db.query()
      return userInfo
    },
    users: async(parent, args, context, info) => {
      const users = await Users.findAll();
      return users;
    },
    getAllListings: async(parent, args, context, info) => {
      const listings = await Listings.findAll();
      return listings;
    }
  },
  Mutation : {
    login: async (parent, args, context, info) => {
      const { email, password } = args;
      const user = await Users.findOne((user) => user.email === email && user.password === password);
      console.log(user)
      return user;
    },
    createListing: async (parent, args, context, info) => {
      const {username, listing} = args;
      const user = await Users.findOne((user) => user.username === username);
      const listingToCreate = await Listings.create({...listing, purchased : false, sellerID: user.id })
      console.log(user, listingToCreate)
      return listingToCreate;
    }
  },
  User: {
    listings: async (parent, args, context, info) => {
      const params = [parent.sellerID]
      const listings = await Listings.findAll((listing) => listing.sellerID === parent.id)
      return listings;
    }
  },
  Listing: {
    seller: async (parent, args, context, info) => {
      console.log('parent: ', parent)
      const seller = await Users.findOne((user) => user.id === parent.sellerID)
      return seller;
    },
  }
}

module.exports = {typeDefs, resolvers};