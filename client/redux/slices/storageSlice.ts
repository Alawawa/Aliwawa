import { PayloadAction } from "@reduxjs/toolkit";
const { createSlice, PayloadAction } = require("@reduxjs/toolkit");
const { v4: uuidv4 } = require("uuid");

const initialState: stateType = {
  username: "",
  loggedIn: false,
  cart: undefined,
  email: "",
};

export const storageSlice = createSlice({
  name: "Storage",
  initialState: initialState,
  reducers: {
    createListings: function (state: stateType, action: PayloadAction<any>) {
      return "hi";
    },
    loginState: (state: stateType, action: PayloadAction<any>) => {
      console.log("in login state");
      const { username, email, cart } = action.payload;
      console.log("checking payload: ", username, email, cart);
      state.loggedIn = true;
      state.username = username;
      state.email = email;
      state.cart = cart;

      console.log("Checking State: ", state);
    },
  },
});

interface stateType {
  username: string;
  loggedIn: boolean;
  cart?: Cart;
  email: string; //idk
}

//grab from database maybe?
//we can update this cart onload from DB
//if theyre logged in
type Cart = {
  id: string | number;
  buyerId: String;
  items: Listing[];
};

type Listing = {
  id: string | number;
  itemName: String;
  itemPrice: number;
  itemPic: String;
  itemDesc: String;
  purchased: Boolean;
  tags: [String];
  sellerId: String;
};

export const { createListings, loginState } = storageSlice.actions;

export default storageSlice.reducers;
