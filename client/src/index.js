import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ContextProvider from "./context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </Provider>
);
