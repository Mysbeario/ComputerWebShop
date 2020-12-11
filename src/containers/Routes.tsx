import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Home/Register";
import "regenerator-runtime/runtime";

const HomePage = lazy(() => import("./Home/Home"));
const LoginPage = lazy(() => import("./Home/Login"));
const Cart = lazy(() => import("./Home/Cart/Cart"));
const Product = lazy(() => import("./Product/ProductDetails"));
const SearchPage = lazy(() => import("../containers/Search/Search"));
const UserPage = lazy(() => import("../containers/User/User"));

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/product/:productId">
          <Product />
        </Route>
        <Route exact path="/search/">
          <SearchPage />
        </Route>
        <Route exact path="/user/">
          <UserPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
