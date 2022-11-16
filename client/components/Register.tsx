import React from "react";
import { Button, Dialog, TextField } from "@mui/material";

interface RegisterProps {
  signup: boolean;
  signupHandler: () => void;
}

function Register({ signupHandler, signup }: RegisterProps) {
  return (
    <Dialog open={signup} fullWidth={true}>
      <Button onClick={() => signupHandler()}>x</Button>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField label="First Name" variant="filled" required />
        <TextField label="Username" variant="filled" required />
        <TextField label="Password" variant="filled" type="password" required />
        <TextField label="Email" variant="filled" type="email" required />
      </form>
    </Dialog>
  );
}

export default Register;
