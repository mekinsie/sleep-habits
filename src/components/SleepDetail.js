import React from "react";
import PropTypes from "prop-types";
import FadeIn from 'react-fade-in';

function MemoryDetail(props){
  const sleep = props.selectedSleep;
  return (
    <>
    <FadeIn transitionDuration="1000">
        <div className="center">
          <h2>Sleep Log Details:</h2>
          <h3>Date:{sleep.date}</h3>
          <h3>Wake Time: {sleep.wakeTime}</h3>
          <h3>Bed Time: {sleep.bedTime}</h3>
          <h3>Wake Time: {sleep.wakeTime}</h3>
          <h3>Energy Level: {sleep.energyLevel}</h3>
          <h3>Mood Level: {sleep.mood}</h3>
          {/* <button onClick={() => props.onClickingDelete(sleep.id)}>Delete Sleep Log</button> */}
          {/* <button onClick={props.onClickingEdit}>Edit Sleep Log</button> */}
        </div>
      </FadeIn>
    </>
  )
}

MemoryDetail.propTypes={
  selectedSleep: PropTypes.object
}

const mapStateToProps = state =>{
  return {
    selectedSleep: state.selectedSleep
  }
}

export default MemoryDetail;