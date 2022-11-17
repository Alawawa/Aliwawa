import React, {useState} from "react";
import { Button, Dialog, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  loginState,
  stateType,
  createCart,
} from "../redux/slices/storageSlice";

interface RegisterProps {
  signup: boolean;
  signupHandler: (boolean?: boolean) => void;
}

function Register({ signupHandler, signup }: RegisterProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  function handleClick() {
    const query = `mutation signup($password: String!, $email: String!, $username: String!) {
      signup(password: $password, email: $email, username: $username) {
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
      username: username
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
        console.log("response from sending signup mutation:", data);
        dispatch(
          loginState({
            username: username,
            email: email,
            cart: data.data.signup.cart,
            listings: data.data.signup.listings,
          })
        );
        //this checks if the user has a cart, if not, we will dispatch createCart in redux.
        if (data.data.signup.cart === null) {
          dispatch(createCart());
        }
        signupHandler(false);
      })
      .catch((err) => console.log(err));
  }
  // const googleLogin = () => {
  //   window.open("http://localhost:3000/auth/google", "_self");
  // };


  return (
    <Dialog open={signup} fullWidth={true}>
      <Button onClick={() => signupHandler()}>x</Button>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" type="email" required />
        <TextField onChange={(e) => setUsername(e.target.value)} label="Username" variant="filled" required />
        <TextField onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" type="password" required />
      </form>
      <Button onClick={() => handleClick()}>Sign Up!</Button>
    </Dialog>
  );
}

export default Register;
