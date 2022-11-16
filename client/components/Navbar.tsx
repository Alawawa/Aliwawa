import React, { useState } from "react";
import { AppBar, Button, Typography, Dialog, TextField } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Box } from "@mui/system";

function Navbar() {
  const [login, toggleLogin] = useState<boolean>(false);
  const [signup, toggleSignup] = useState<boolean>(false);

  const loginHandler = () => {
    toggleLogin(!login);
  };

  const signupHandler = () => {
    toggleSignup(!signup);
  };

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
          >
            <ShoppingCartRoundedIcon />
          </Button>
        </Box>
      </AppBar>
      <Dialog open={login} fullWidth={true}>
        <Button onClick={() => loginHandler()}>x</Button>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <TextField label="First Name" variant="filled" required />
          <TextField label="Username" variant="filled" required />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
          />
          <TextField label="Email" variant="filled" type="email" required />
        </form>
      </Dialog>
      <Dialog open={signup} fullWidth={true}>
        <Button onClick={() => signupHandler()}>x</Button>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <TextField label="Username" variant="filled" required />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
          />
        </form>
      </Dialog>
      {/* <Modal open={login} onClose={() => toggleLogin(false)}>
        <ModalDialog>
          <span>Hello</span>
        </ModalDialog>
      </Modal> */}
    </>
  );
}

export default Navbar;
