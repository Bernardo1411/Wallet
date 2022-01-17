import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Wallet from "./pages/Wallet";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  let content = (
    <Switch>
      <Route path="/" exact component={Login} />{" "}
    </Switch>
  );

  if (isAuth) {
    content = (
      <Switch>
        <Route path="/carteira" component={Wallet} />
        <Route path="/" exact component={Login} />
      </Switch>
    );
  }

  return <div className="main_page">{content}</div>;
}

export default App;
