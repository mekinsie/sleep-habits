import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'
import FadeIn from 'react-fade-in';
import { isLoaded } from 'react-redux-firebase'
import firebase from "firebase/app";

function NewSleepForm(props){
  const firestore = useFirestore();
  const auth = firebase.auth();

  function addSleepToFirestore(event){
    event.preventDefault();
    props.onNewSleepCreation();
    return firestore.collection('sleepData').add(
      {
        date: event.target.date.value,
        wakeTime: event.target.wakeTime.value,
        bedTime: event.target.bedTime.value,
        energyLevel: event.target.energyLevel.value,
        mood: event.target.mood.value,
        timeOpen: firestore.FieldValue.serverTimestamp(),
        userEmail: auth.currentUser.email
      });
  }

  if(!isLoaded(auth)){
    return (
      <React.Fragment>
        <h1 className="center">Loading...</h1>
      </React.Fragment>
    )
  }

  if(isLoaded(auth)) {
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <div className="form card">
            <ReusableForm
            userEmail = {auth.currentUser.email}
            formSubmissionHandler={addSleepToFirestore}
            buttonText="Save Sleep" />
          </div>
        </FadeIn>
      </React.Fragment>
    );
  }
}

NewSleepForm.propTypes = {
  OnNewSleepCreation: PropTypes.func
}

export default NewSleepForm;