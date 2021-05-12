import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'
import FadeIn from 'react-fade-in';

function NewSleepForm(props){
  const firestore = useFirestore();

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
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    )
  }

  return(
    <React.Fragment>
      <FadeIn transitionDuration='1000'>
        <div className="form card">
          <ReusableForm
          formSubmissionHandler={addSleepToFirestore}
          buttonText="Save Sleep" />
        </div>
      </FadeIn>
    </React.Fragment>
  );
}

NewSleepForm.propTypes = {
  OnNewSleepCreation: PropTypes.func
}

export default NewSleepForm;