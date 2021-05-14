import React from "react";
import firebase from "firebase/app";
import { isLoaded } from 'react-redux-firebase'
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";


function Nav(props){
  const history = useHistory();
  function doLogOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
      history.push("/login");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  const auth = firebase.auth();

  if(!isLoaded(auth)){
    return (
      <React.Fragment>
      <div className="navbar">
        {/* <Link to="/">Home</Link> */}
        <a onClick={props.onClickHome}>Home</a>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <a onClick={doLogOut}>Log Out</a>
      </div>
      <div className="card">
        <h1 className="center">Loading...</h1>
      </div>
      </React.Fragment>
    )
  }
  if((isLoaded(auth)) && (auth.currentUser == null)){
    return (
      <React.Fragment>
        <div className="navbar">
          {/* <Link to="/">Home</Link> */}
          <a onClick={props.onClickHome}>Home</a>
        </div>
      </React.Fragment>
    )
  }

  if((isLoaded(auth)) && (auth.currentUser != null)){
    return (
      <>
        <div className="navbar">
          {/* <Link to="/">Home</Link> */}
          <a onClick={props.onClickHome}>Home</a>
          <a href="#">Profile</a>
          <a href="#">Calendar</a>
          <a onClick={doLogOut}>Log Out</a>
        </div>
      </>
    );
  }
}

Nav.propTypes={
  onClickHome: PropTypes.func
}


export default Nav;