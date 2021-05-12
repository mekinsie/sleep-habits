import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';
import FadeIn from 'react-fade-in';

function EditSleepForm(props) {
  const firestore = useFirestore();

  function handleEditSleepSubmission(event){
    event.preventDefault();
    props.onEditSleep();
    const propertiesToUpdate = {
      date: event.target.date.value,
      wakeTime: event.target.wakeTime.value,
      bedTime: event.target.bedTime.value,
      energyLevel: event.target.energyLevel.value,
      mood: event.target.mood.value
    }
    return firestore.update({collection: 'sleepData', doc: props.sleep.id}, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <FadeIn transitionDuration="1000">
        <form className="form card" onSubmit={handleEditSleepSubmission}>
          <div>
            <label>
              Date:
              <input
                type='date'
                name='date'
                defaultValue={props.sleep.date}
                required />
              </label>
          </div>
          <div>
            <label>
              Wake Time:
              <input
                type='time'
                name='wakeTime'
                defaultValue={props.sleep.wakeTime}
                />
            </label>
          </div>
          <div>
            <label>
              Bed Time:
              <input
                type='time'
                name='bedTime'
                defaultValue={props.sleep.bedTime}
                />
            </label>
          </div>
          <div>
            <label>
              Energy Level:
              <select name="energyLevel" defaultValue={props.sleep.energyLevel}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </label>
          </div>
          <div>
            <label>
              Mood Level:
              <select name="mood" defaultValue={props.sleep.mood}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </label>
          </div>
          <div>
            <button type='submit'>Update Sleep Log</button>
          </div>
        </form>
        </FadeIn>
    </React.Fragment>
  );
}

EditSleepForm.propTypes = {
  sleep: PropTypes.object,
  onEditSleep: PropTypes.func
};

export default EditSleepForm;