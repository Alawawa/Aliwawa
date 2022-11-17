const db = require("./models/model");
const { ApolloServer, gql } = require("apollo-server-express");
const schema = require("./models/model");
const { Listings, Users, Transactions, Cart } = schema;

console.log("Checking schemas :", Listings);

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
    createCart(cart: CartType): Cart!
    addToCart(username: String, listing: ListingType): Cart!
    removeFromCart(username: String, listing: ListingType): Cart!
    checkoutCart: Boolean!
  }

  input ListingType {
    itemName: String!
    itemPrice: Int!
    itemDesc: String!
    itemPic: String!
    id: ID!
    purchased: Boolean!
    sellerId: String!
    tags: [String]
  }

  input CartType {
    id: ID
    buyerId: String!
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
    buyer: User!
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
`;

const resolvers = {
  Query: {
    getUser: async (parent, { id, username }, context, info) => {
      const userInfo = await Users.findOne({ id: id, username: username });
      return userInfo;
    },
    getAllUsers: async (parent, args, context, info) => {
      const users = await Users.find({});
      return users;
    },
    getAllListings: async (parent, args, context, info) => {
      const listings = await Listings.find({});
      return listings;
    },
  },
  Mutation: {
    login: async (parent, args, context, info) => {
      const { email, password } = args;
      const user = await Users.findOne({ email: email, password: password });
      return user;
    },
    signup: async (parent, args, context, info) => {
      const { email, username, password } = args;
      console.log("checking sign up args: ", args)
      const newUser = await Users.create({
        email: email,
        username: username,
        password: password,
        oauth: false,
      });
      console.log("checking new user ", newUser);
      return newUser;
    },
    createListing: async (parent, args, context, info) => {
      const { username, listing } = args;
      const listingToCreate = await Listings.create({
        ...listing,
        purchased: false,
        sellerId: username,
      });
      return listingToCreate;
    },
    addToCart: async (parent, args, context, info) => {
      const { username, listing } = args;
      console.log("logging listing args:", listing);
      //update the cart with the username
      const updatedCart = await Cart.findOneAndUpdate(
        { buyerId: username },
        { $push: { items: listing } }
      );
      console.log('updated cart:',updatedCart)
      return updatedCart;
    },
    createCart: async (parent, args, context, info) => {
      const { cart } = args;
      console.log("Checking input cart: ", cart);
      const newCart = await Cart.create({ ...cart });
      console.log("Checking input newCart: ", newCart);
      return newCart;
    },
    removeFromCart: async (parent, args, context, info) => {
      const { username, listing } = args;
      console.log("logging username listing from args:", listing);
      //delete the listing in the cart array with the username
      // iterate through the item array and find the listing that matches
      const updatedCart = await Cart.findOneAndDelete(
        { buyerId: username },
        { $filter: {items: listing }}
      );
      return updatedCart;
    },
  },
  User: {
    listings: async (parent, args, context, info) => {
      const listings = await Listings.find({ sellerId: parent.username });
      return listings;
    },
    cart: async (parent, args, context, info) => {
      const cart = await Cart.findOne({ buyerId: parent.username });
      return cart;
    },
  },
  Listing: {
    seller: async (parent, args, context, info) => {
      const seller = await Users.findOne({ username: parent.sellerId });
      return seller;
    },
  },
  // Cart: {
  //   items: async (parent, args, context, info) => {
      
  //   }
  // }
};

module.exports = { typeDefs, resolvers };
