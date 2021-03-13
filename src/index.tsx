import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components";
import store from "./store";
import { CurrencyApiContext } from "./contexts";
import { CurrencyApi } from "./services";

const apiService = new CurrencyApi();
ReactDOM.render(
  <CurrencyApiContext.Provider value={apiService}>
    <Provider store={store}>
      <App />
    </Provider>
  </CurrencyApiContext.Provider>,
  document.getElementById("root")
);
