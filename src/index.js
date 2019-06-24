import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import configureStore from "./store";
import axios from "axios";
import { BASE_API_URL } from "actions";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

axios.defaults.baseURL = BASE_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
