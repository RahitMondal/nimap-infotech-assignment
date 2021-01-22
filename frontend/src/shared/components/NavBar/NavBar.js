import React from "react";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar p-1 justify-content-center">
      <a href="/categories" className="m-3">
        Categories
      </a>
      <a href="/products" className="m-3">
        Products
      </a>
    </nav>
  );
};

export default NavBar;
