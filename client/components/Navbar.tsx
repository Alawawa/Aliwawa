import React from 'react'
import {AppBar, Button, Typography} from '@mui/material'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box } from '@mui/system';


function Navbar() {
  return (
    <AppBar sx={{height: '50px', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', position: 'fixed', padding: "0px 20px"}}>  
      <Typography>ALIWAWA</Typography>
      <Box sx={{width: '20%', display: 'flex', justifyContent: 'space-between'}}>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1, padding: '3px'}}>Login</Button>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1}}>Register</Button>
        <Button size='small' color="secondary" variant="contained" sx={{color: 'white', border: 1}}><ShoppingCartRoundedIcon /></Button>
      </Box>
    </AppBar>
  )
}


export default Navbar;