import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import NavBar from "./shared/components/NavBar/NavBar";
import Category from "./categories/pages/Category";
import Product from "./products/pages/Product";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/categories" exact>
            <Category />
          </Route>
          <Route path="/products" exact>
            <Product />
          </Route>
          <Redirect to="/categories"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
