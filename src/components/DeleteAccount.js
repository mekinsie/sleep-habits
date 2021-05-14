import React, {useState} from 'react';
import firebase from "firebase/app";
import FadeIn from 'react-fade-in';
import { Link, useHistory } from "react-router-dom";
import "firebase/auth";

function DeleteAccount() {
  const history = useHistory();

  function deleteAccount() {
    firebase.auth().currentUser.delete().then(function() {
      console.log("Account Deleted");
      history.push("/login");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return(
    <React.Fragment>
      <FadeIn transitionDuration="1000">
        <h1 className="center">Are you sure you want to delete your account?</h1>
        <button onClick={deleteAccount} href="#">Delete Account</button>
        <a href="/"><button>No, take me back</button></a>

      </FadeIn>
    </React.Fragment>
  )

}

export default DeleteAccount;