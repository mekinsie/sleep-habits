import React from "react";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase'
import { Link, useHistory } from "react-router-dom";


function Nav(){
  const history = useHistory();

  function doLogOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
      history.push("/login");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  // const auth = this.props.firebase.auth();
  // if(!isLoaded(auth)){
  //   return (
  //     <React.Fragment>
  //       <h1 className="center">Loading...</h1>
  //     </React.Fragment>
  //   )
  // }
  // if((isLoaded(auth)) && (auth.currentUser == null)){
  //   return (
  //     <React.Fragment>
  //       <h1 className="center">Welcome</h1>
  //       <Link to="/login"><button>Log in</button></Link>
  //       <Link to="/signup"><button>Create New Account</button></Link>
  //     </React.Fragment>
  //   )
  // }

  // if((isLoaded(auth)) && (auth.currentUser != null)){

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