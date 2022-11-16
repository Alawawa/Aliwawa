import React from 'react'
import {AppBar, Button, Typography, Paper, Fade} from '@mui/material'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box } from '@mui/system';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
// const googleImage = require('../assets/googleImage.jpg')

function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((previousOpen) => !previousOpen);
  }

  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  }

  const twitterLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  }

  return (
    <AppBar sx={{height: '50px', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', position: 'fixed', padding: "0px 20px"}}>  
      <Typography>ALIWAWA</Typography>
      <Box sx={{width: '20%', display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', width: '500px', height: '30px', backgroundColor: 'lightblue'}} onClick={googleLogin}>
          <img src={require('../assets/googleImage.jpg')} alt="" />
          <p>Google Login</p>
        </div>
        <div style={{display: 'flex', width: '500px', height: '30px', backgroundColor: 'lightblue'}} onClick={twitterLogin}>
          {/* <img src={require('../assets/googleImage.jpg')} alt="" /> */}
          <p>Twitter Login</p>
        </div>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1, padding: '3px'}}>Login</Button>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1}}>Register</Button>
        <Button onClick={handleClick} type="button" size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1}} ><ShoppingCartRoundedIcon /></Button>
        <Popper open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography sx={{ p: 2}}>Shopping Cart List</Typography>
              </Paper>  
            </Fade>
          )}
        </Popper>
      </Box>
    </AppBar>
  )
}


export default Navbar;