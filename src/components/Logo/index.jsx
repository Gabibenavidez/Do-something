import React from "react";
import { Link } from 'react-router-dom';


export const NavbarLogo = () => {
    return (
      <div className="navbar__logo">
        <Link to="/">
          <span>D</span>
          <span>o</span>
          <span> </span>
          <span>S</span>
          <span>o</span>
          <span>m</span>
          <span>e</span>
          <span>t</span>
          <span>h</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </Link>
      </div>
    );
  };