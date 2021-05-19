import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import SleepDay from './SleepDay'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SleepCalendar from './SleepCalendar';

const HomeHeader = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-family: 'Cormorant', serif;
  `;

function SleepLogs(props){
  const [calendarVisible, toggleCalendar] = useState(false);

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

    if (calendarVisible){
      return(
        <React.Fragment>
        <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>List View</button>
        <SleepCalendar userEmail={props.userEmail} onClickAdd={props.onClickAdd} onSleepSelection={props.onSleepSelection}/>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>Calendar View</button>
          <button className="button" onClick={props.onClickAdd}>Add sleep log</button>
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