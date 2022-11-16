import React, { useState, useEffect } from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {
  loginState,
  stateType,
  createCart,
} from "../redux/slices/storageSlice";
import { useDispatch, useSelector } from "react-redux";

interface LoginProps {
  login: boolean;
  loginHandler: (boolean?: boolean) => void;
}

function Login({ loginHandler, login }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  function handleClick() {
    const query = `mutation login($password: String!, $email: String!) {
      login(password: $password, email: $email) {
        username
        email
        listings {
          id
          itemName
          itemDesc
          itemPrice
          itemPic
          tags
          purchased
        }
        cart {
          id
          buyerId
          items {
            id
            itemName
            itemDesc
            itemPrice
            itemPic
            tags
            purchased
          }
        }
      }
    }`;

    const variables = {
      email: email,
      password: password,
    };

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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //dispatch here for login state
        console.log("response from sending login mutation:", data);
        dispatch(
          loginState({
            username: username,
            email: email,
            cart: data.data.login.cart,
            listings: data.data.login.listings,
          })
        );
        //this checks if the user has a cart, if not, we will dispatch createCart in redux.
        if (data.data.login.cart === null) {
          dispatch(createCart());
        }
        loginHandler(false);
      })
      .catch((err) => console.log(err));
  }
  const googleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

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
      <div
        style={{
          display: "flex",
          width: "500px",
          height: "30px",
          backgroundColor: "white",
        }}
        onClick={googleLogin}
      >
        {/* <img src={require('../assets/googleImage.jpg')} alt="" /> */}
        <p>Login with Google</p>
      </div>
    </Dialog>
  );
}

export default Login;
