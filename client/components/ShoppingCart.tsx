import { Drawer } from "@mui/material";
import React, { useState } from "react";

function ShoppingCart() {
  return (
    <Drawer open={false} anchor="right">
      <span>My Cart</span>
    </Drawer>
  );
}

export default ShoppingCart;
