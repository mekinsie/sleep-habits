import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase'


function Nav(){
  function doLogOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>
        <a href="#">Profile</a>
        <a href="#">Options</a>
        <Link to="/login">Log In</Link>
        <a onClick={doLogOut}>Log Out</a>
      </div>
    </>
  );
}

export default Nav;