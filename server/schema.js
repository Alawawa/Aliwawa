const db = require('./models/itemModel')
const { ApolloServer, gql } = require('apollo-server-express');
const { Users, Listings } = require("./db.js");

const typeDefs = gql`
    type Query {
        user(id: ID!): User!
        users: [User!]
        listing(id:ID!): Listing!
    }

    type Mutation {
        login(email: String, password: String): User!
        signup(email: String, password: String): User!
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
        purchased: Boolean!
        tags: [String!]
        sellerID: ID!,
        seller: User!
    }
`


const resolvers = {
  Query: {
    user: async ({ id }) => {
      const userInfo = await db.query()
      return userInfo
    }
  },
  Mutation : {
    login: async (parent, args, context, info) => {
      const { email, password } = args;
      const user = await Users.findOne((user) => user.email === email && user.password === password);
      console.log(user)
      return user;
    }
  },
  User: {
    listings: async (parent, args, context, info) => {
      const params = [parent.sellerID]
      const listings = await Listings.findAll((listing) => listing.sellerID)
      console.log(listings);
      return listings;
    }
  },
  Listing: {
    seller: async (parent, args, context, info) => {
      const seller = await Users.findOne((user) => user.id === parent.sellerID)
      return seller;
    }
  }
}

module.exports = {typeDefs, resolvers};