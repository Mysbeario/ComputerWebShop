import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Home/Register";

const HomePage = lazy(() => import("./Home/Home"));
const LoginPage = lazy(() => import("./Home/Login"));
const Cart = lazy(() => import("./Home/Cart"));
const Product = lazy(() => import("./ProductDetails"));

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route expact path="/login">
          <LoginPage />
        </Route>
        <Route expact path="/register">
          <Register />
        </Route>
        <Route expact path="/cart">
          <Cart />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
