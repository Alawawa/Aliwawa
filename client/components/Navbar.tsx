import React, { useState } from "react";
import { AppBar, Button, Typography, Dialog, TextField } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Box } from "@mui/system";
import Login from "./Login";
import Register from "./Register";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
  const [login, toggleLogin] = useState<boolean>(false);
  const [signup, toggleSignup] = useState<boolean>(false);
  const [cart, toggleCart] = useState(false);

  const loginHandler = () => {
    toggleLogin(!login);
  };

  const signupHandler = () => {
    toggleSignup(!signup);
  };

  const cartHandler = () => {
    toggleCart(!cart);
  }

  return (
    <>
      <AppBar
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          position: "fixed",
          padding: "0px 20px",
        }}
      >
        <Typography>ALIWAWA</Typography>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ color: "white", border: 1, padding: "3px" }}
            onClick={() => loginHandler()}
          >
            Welcome User! Logout.
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ color: "white", border: 1, padding: "3px" }}
            onClick={() => loginHandler()}
          >
            Login
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ color: "white", border: 1 }}
            onClick={() => signupHandler()}
          >
            Register
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ color: "white", border: 1 }}
            onClick={() => cartHandler()}
          >
            <ShoppingCartRoundedIcon />
          </Button>
        </Box>
      </AppBar>
      <Login login={login} loginHandler={loginHandler} />
      <Register signup={signup} signupHandler={signupHandler} />
      <ShoppingCart cart={cart} cartHandler={cartHandler} />
    </>
  );
}

export default Navbar;
