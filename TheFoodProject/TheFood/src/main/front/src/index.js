import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import Auth from "./service/auth";
import BoardApi from "./service/board_api";
import { BrowserRouter } from "react-router-dom";
import AuthTest from "./service/auth-test";
import BoardApiTest from "./service/board_api-test";

const root = ReactDOM.createRoot(document.getElementById("root"));
const key = "dtikdam3i";
const auth = new Auth();
const boardApi = new BoardApi(key);
// const auth = new AuthTest();
// const boardApi = new BoardApiTest(key);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App auth={auth} boardApi={boardApi} />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
