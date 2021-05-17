import React from 'react';
import firebase from "firebase/app";
import FadeIn from 'react-fade-in';
import {useHistory } from "react-router-dom";
import "firebase/auth";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, withFirestore } from 'react-redux-firebase';

function DeleteAccount(props) {
  const history = useHistory();

  useFirestoreConnect(() => {
    return [ {collection: 'sleepData', where: [["userEmail", "==", `${props.userEmail}`]]} ] 
  });
  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  function deleteAccount() {
    firebase.auth().currentUser.delete().then(function() {
      console.log("Account Deleted");
      // sleepData.forEach((sleepLog) => {
      //   props.firestore.delete({collection: 'sleepData', doc: sleepLog.id});
      // })
      history.push("/login");
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  if (isLoaded(sleepData)){
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
}

export default withFirestore(DeleteAccount);