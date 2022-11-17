import {createTheme} from '@mui/material/'  
import { fontFamily } from '@mui/system'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F9CDAD  ',
      light: '#7cd0e9',
      dark: '#4e90d6',
    },
    secondary: {
      main: '#484f57',
    },
    // overrides: {
    //    MuiButton: {
    //     raisedPrimary: {
    //       color: '',
    // },
    background: {
      default: '#e4e4e4',
      paper: '#bdbdbd',
    },
    error: {
      main: '#ff5243',
    },
    success: {
      main: '#48aa4c',
    },
  },
})
