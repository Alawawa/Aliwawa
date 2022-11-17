import { Button, Drawer } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import {useSelector, shallowEqual} from 'react-redux'
import type { RootState } from "../redux/store";
import {current} from '@reduxjs/toolkit'

interface ShoppingCartProps {
  cart: boolean;
  cartHandler: () => void;
}

function ShoppingCart({ cart, cartHandler }: ShoppingCartProps) {
  const state = useSelector((state: RootState) => state.storageSlice);
  const stateCart = useSelector((state: RootState) => state.storageSlice.cart);
  const stateCartItems = useSelector((state: RootState) => state.storageSlice.cart?.items);
  const [cartItems, setCartItems] = useState<any>([]);
  // useEffect(()=> {
  //  console.log("Checking state: ", state)
  //  if (state.loggedIn) {
  //   setUserCart(state.cart.items)
  //   console.log("Checking state: ", state)
  //  }
  // })
  useEffect(() => {
    if (state.loggedIn) {
      console.log("Checking state cart items: ", stateCartItems)
      console.log("Checking state cart: ", stateCart)
      console.log("Checking state: ", state)
      setCartItems(stateCartItems)
    }
  }, [state.loggedIn])

  useEffect(() => {
    if (stateCart !== undefined) {
      console.log("Bro")
      setCartItems(stateCartItems)
    }
  })

  // useEffect(() => {
  //   if (cartItems !== state.current.cart?.items && state.current.cart !== undefined) {
  //     setCartItems(state.current.cart.items)
  //   }
  //   console.log("Update to cart: ", state)
  // }, [state, state.current] )

  return (
    <Drawer open={cart} anchor="right" PaperProps={{ sx: { width: 500 } }}>
      <Button onClick={() => cartHandler()}>x</Button>
      <span>My Cart</span>
      <div>
        {cartItems?.map((item: ListingType) => <CartItemDisplay itemName={item.itemName} itemPrice={item.itemPrice} itemPic={item.itemPic} />)}
      </div>
    </Drawer>
  );
}

interface ListingType {
  itemName: string;
  itemDesc: string;
  itemPrice: number | string;
  itemPic: string;
  tags?: [string?];
  id: number | string;
  purchased: boolean;
  sellerId: string;
}

interface CartItemType {
  itemName: string,
  itemPrice: number | string,
  itemPic: string,
}

const CartItemDisplay = ({itemName, itemPrice, itemPic}: CartItemType) => {
  return (
    <div style={{display: 'flex', border: "2px solid black", width: '100%'}}>
      <span>{itemName}</span>
      <span>{itemPrice}</span>
      <img src={itemPic} height="50px" width="50px"/>
    </div>
  )
}

export default ShoppingCart;
