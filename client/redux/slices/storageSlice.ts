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
      state.listings = listings;
      state.cart = cart;
      console.log("Checking State: ", current(state));
    },
    createCart: (state: stateType, action: PayloadAction<any>) => {
      const newCart: Cart = {
        id: uuidv4(),
        buyerId: state.username,
        items: [],
      };
      const query = `mutation createCart($cart: CartType) {
        createCart(cart: $cart) {
          id
          buyerId
        }
      }`;
      const variables = {
        cart: newCart,
      };

      //update cart
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Checking new cart", data))
        .catch((err) => console.log(err));
    },
    addToCart: (state: stateType, action: PayloadAction<any>) => {
      //push items from action payload into the state's cart's items array
      const { item } = action.payload;
      state.cart!.items.push(item);
      console.log("Checking State: ", current(state));
    },
    removeFromCart: (state: stateType, action: PayloadAction<any>) => {
      const { item } = action.payload;
      const { id } = item;
      //search through current cart array
      const itemIndex = state.cart!.items.findIndex(
        (current: any) => current.id === id
      );
      state.cart!.items.splice(itemIndex, 1);
      console.log("Checking State: ", current(state));
    },
    createListing: (state: stateType, action: PayloadAction<any>) => {
      // form with all the item desc
      // pass in an object that will look like type listing
      // if item id exists, just update the quantity
      // push that onto listing array state
      const { listing } = action.payload;
      state.listings.push(listing);
    },
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

export const {
  loginState,
  createCart,
  addToCart,
  removeFromCart,
  createListing,
} = storageSlice.actions;

export default storageSlice.reducer;

// export default storageSlice
