import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

function SleepDay(props) {

  const SleepData = styled.div`
    background-color: rgb(29, 24, 59);
    color: white;
    width: 300px;
    margin:auto;
    padding: 50px;
    margin-bottom: 20px;
    border-radius: 10px;
    opacity: 0.9;
  `;

  return (
    <React.Fragment>
      <SleepData>
        <div className='center'>
          <span id="h3-link"><h3 onClick = {() => props.whenSleepClicked(props.sleep)}>{props.date}</h3></span>
          <p>Bed Time: {props.bedTime}</p>
          <p>Wake Time: {props.wakeTime}</p>
          <p>Energy Level: {props.energyLevel}</p>
          <p>Mood Level: {props.mood}</p>
        </div>
      </SleepData>
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
