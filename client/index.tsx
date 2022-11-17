import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { theme } from "./themes";
import { ThemeProvider } from "@mui/material";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

console.log("What does store look like: " + store.reducer)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
