import React, { useState } from "react";
import { Button, Dialog, TextField } from "@mui/material";
import { loginState } from "../redux/slices/storageSlice";
const { useDispatch, useSelector } = require("react-redux");

interface LoginProps {
  login: boolean;
  loginHandler: () => void;
}

function Login({ loginHandler, login }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  function handleClick() {
    const payload = {
      username,
      password,
      email,
    };
    console.log("inside handle click", loginState);
    dispatch(loginState(payload));
  }

  return (
    <Dialog open={login} fullWidth={true}>
      <Button onClick={() => loginHandler()}>x</Button>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="filled"
          required
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="filled"
          type="password"
          required
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
          type="email"
          required
        />
      </form>
      <Button onClick={() => handleClick()}>Sign In</Button>
    </Dialog>
  );
}

export default Login;
