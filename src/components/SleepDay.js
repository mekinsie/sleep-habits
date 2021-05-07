import React from "react";
import PropTypes from "prop-types";

function SleepDay(props) {
  return (
    <React.Fragment>
      <hr></hr>
      <p>{props.date}</p>
      <p>Wake Time: {props.wakeTime}</p>
      <p>Bed Time: {props.bedTime}</p>
      <p>Energy Level: {props.energyLevel}</p>
      <p>Mood Level: {props.mood}</p>
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
