import type { PayloadAction } from "@reduxjs/toolkit";
const { createSlice, PayloadAction, current } = require("@reduxjs/toolkit");
const { v4: uuidv4 } = require("uuid");

const initialState = {
  username: "",
  loggedIn: false,
  cart: undefined,
  listings: [],
  email: "",
} as stateType;

export const storageSlice = createSlice({
  name: "Storage",
  initialState: initialState,
  reducers: {
    loginState: (state: stateType, action: PayloadAction<any>) => {
      console.log("in login state");
      const { username, email, cart, listings } = action.payload;
      state.loggedIn = true;
      state.username = username;
      state.email = email;
      state.cart = cart;
      state.listings = listings;
      console.log("Checking State: ", current(state));
    },
    addToCart: (state: stateType, action: PayloadAction<any>) => {
      //push items from action payload into the state's cart's items array
      const { item } = action.payload;
      state.cart!.items.push(item);
    },
    removeFromCart: (state: stateType, action: PayloadAction<any>) => {
      const { item } = action.payload;
      //get id from item/listing
      // const 
      //search through current cart array
      const itemIndex = state.cart!.items.findIndex(
        (current: any) => current.id === item.id
      );
      state.cart!.items.splice(itemIndex, 1);
    },
    createListing: (state: stateType, action: PayloadAction<any>) => {},
  },
});

export interface stateType {
  username: string;
  loggedIn: boolean;
  cart?: Cart;
  listings: [Listing?];
  email: string; //idk
}

//grab from database maybe?
//we can update this cart onload from DB
//if theyre logged in
type Cart = {
  id: string | number;
  buyerId: String;
  items: [Listing?];
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

export const { loginState } = storageSlice.actions;

export default storageSlice.reducer;
// export default storageSlice
