import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import i18n from "./i18n";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router>
        <ToastContainer autoClose={5000} position="top-center" closeOnClick />
        <App />
      </Router>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
