import React from "react";
import PropTypes from "prop-types";
import FadeIn from 'react-fade-in';

function SleepDetail(props){
  return (
    <>
    <FadeIn transitionDuration="1000">
        <div className="center card">
          <h2>Sleep Log Details:</h2>
          <h3>Date:{props.sleep.date}</h3>
          <h3>Wake Time: {props.sleep.wakeTime}</h3>
          <h3>Bed Time: {props.sleep.bedTime}</h3>
          <h3>Wake Time: {props.sleep.wakeTime}</h3>
          <h3>Energy Level: {props.sleep.energyLevel}</h3>
          <h3>Mood Level: {props.sleep.mood}</h3>
          <button onClick={() => props.onClickingDelete(props.sleep.id)}>Delete Sleep Log</button>
          <button onClick={props.onClickingEdit}>Edit Sleep Log</button>
        </div>
      </FadeIn>
    </>
  )
}

SleepDetail.propTypes={
  selectedSleep: PropTypes.object,
  onClickingDelete: PropTypes.func
}

const mapStateToProps = state =>{
  return {
    selectedSleep: state.selectedSleep
  }
}

export default SleepDetail;