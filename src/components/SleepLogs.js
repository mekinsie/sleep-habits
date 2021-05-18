import React from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import SleepDay from './SleepDay'
import styled from 'styled-components';

const HomeHeader = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-family: 'Cormorant', serif;

  `;

function SleepLogs(props){

  useFirestoreConnect(() => {
    let date;
    date = props.lastWeek(date);
    return [
      {collection: 'sleepData', where: [["date", ">=", `${date}`], ["userEmail", "==", `${props.userEmail}`]], orderBy: [["date", "desc"]]}
    ]
  });

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  if (isLoaded(sleepData)){
    let message;
    if (sleepData.length == 0){
      message = 'Add a sleep log to get started!'
    }
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <button onClick={props.onClickAdd}>Add sleep log</button>
          {/* <div>
            <button>See month</button>
            <button>See year</button>
          </div> */}
          <HomeHeader>This week's sleep logs:</HomeHeader>
          <p className="center">{message}</p>
          {sleepData.map((day)=>{
            return <SleepDay
            whenSleepClicked = {props.onSleepSelection}
            date = {day.date}
            bedTime = {day.bedTime}
            wakeTime = {day.wakeTime}
            energyLevel = {day.energyLevel}
            mood = {day.mood}
            id = {day.id}
            key={day.id}
            sleep={day}
            />
          })}
        {console.log(sleepData)}
        </FadeIn>
      </React.Fragment>
    );
  } else {
    return (
      <>
        <span className="center"><h3> Loading... </h3></span>
      </>
    );
  }
}

SleepLogs.propTypes = {
  onSleepSelection: PropTypes.func,
  lastWeek: PropTypes.func,
  onClickAdd: PropTypes.func,
  userEmail: PropTypes.string
};

export default SleepLogs;