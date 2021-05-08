import React from "react";
import PropTypes from "prop-types";

function SleepDay(props) {
  return (
    <React.Fragment>
      <div className='center'>
      <hr></hr>
      <h3 onClick = {() => props.whenSleepClicked(props.sleep)}>{props.date}</h3>
      <p>Wake Time: {props.wakeTime}</p>
      <p>Bed Time: {props.bedTime}</p>
      <p>Energy Level: {props.energyLevel}</p>
      <p>Mood Level: {props.mood}</p>
      </div>
    </React.Fragment>
  );
}

SleepDay.propTypes = {
  date: PropTypes.string,
  wakeTime: PropTypes.string,
  bedTime: PropTypes.string,
  energyLevel: PropTypes.string,
  mood: PropTypes.string,
};

export default SleepDay;
