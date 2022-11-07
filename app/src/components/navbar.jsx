import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to={`/`} style={{ textDecoration: "none" }}>
        {" "}
        {/* por qué no me deja quitarle el subrayado en CSS? */}
        <div className="titleNav">DEMO Streaming</div>
      </NavLink>
      <div className="navBtns">
        <button className="loginBtn">Log in</button>
        <button className="trialBtn">start your free trial</button>
      </div>
    </nav>
  );
};

export default Navbar;
