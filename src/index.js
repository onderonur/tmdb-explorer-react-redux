import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import rootSaga from "sagas";
import ConfigurationProvider from "components/ConfigurationProvider";
import { CssBaseline } from "@material-ui/core";

store.runSaga(rootSaga);

const renderApp = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfigurationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigurationProvider>
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );

// if (process.env.NODE_ENV !== "production" && module.hot) {
//   module.hot.accept("components/App", renderApp);
// }

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
