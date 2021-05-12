import React from "react";
import { Link } from "react-router-dom";

function Nav(){
  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>
        <a href="#">Profile</a>
        <a href="#">Options</a>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Nav;