import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { theme } from "./themes";
import { ThemeProvider } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

//initate a new Apollo Client here to connect to our graphQL server.
const client = new ApolloClient({
  uri: 'http://localhost:8080/api',
  cache: new InMemoryCache(),
  credentials:'same-origin',
})



root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
  
);
