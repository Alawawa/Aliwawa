import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";

interface ShoppingCartProps {
  cart: boolean;
  cartHandler: () => void;
}

function ShoppingCart({ cart, cartHandler }: ShoppingCartProps) {
  return (
    <Drawer open={cart} anchor="right" PaperProps={{ sx: { width: 500 } }}>
      <Button onClick={() => cartHandler()}>x</Button>
      <span>My Cart</span>
    </Drawer>
  );
}

export default ShoppingCart;
