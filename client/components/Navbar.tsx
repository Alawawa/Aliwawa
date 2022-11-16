import React, { useState } from "react";
import { AppBar, Button, Typography, Dialog } from "@mui/material";
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
      <Dialog open={login} sx={{}}>
        <Button onClick={() => loginHandler()}>x</Button>
        <input type="text" />
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
