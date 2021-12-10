import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1 className="title">
        C
        <NavLink
          to="/secretPage"
          className="title"
          style={({ isActive }) =>
            isActive ? { display: "none" } : { textDecoration: "none" }
          }
        >
          H
        </NavLink>
        AT ZONE
      </h1>
      <Outlet />
    </div>
  );
};

export default App;
