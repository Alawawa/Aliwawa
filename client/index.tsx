import * as React from "react";
import ReactDOM from "react-dom/client";
import App from './components/App';
import store  from "./redux/store";
import { Provider } from "react-redux";
import { theme } from './themes'
import { ThemeProvider } from '@mui/material'



let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
)
