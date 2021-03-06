import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import SleepDay from './SleepDay'
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import SleepCalendar from './SleepCalendar';

const HomeHeader = styled.h3`
  text-align: center;
  color: white;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  `;

const WeekDate = styled.h2`
  text-align: center;
  color: white;
  font-size: 1.95em;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  font-family: 'Source Sans Pro', sans-serif;
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
    let week;

    if (sleepData.length == 0){
      message="You currently have no sleep logs for the week"
    } else {
      week = `${sleepData[0].date.substring(5,7)}/${sleepData[0].date.substring(8,10)} - ${sleepData[sleepData.length -1].date.substring(5,7)}/${sleepData[sleepData.length-1].date.substring(8,10)}`
    }

    if (calendarVisible){
      return(
        <React.Fragment>
        <div className="button-div">
          <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>List View</button>
          <SleepCalendar userEmail={props.userEmail} onClickAdd={props.onClickAdd} onSleepSelection={props.onSleepSelection}/>
        </div>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <div className="button-div">
            <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>Calendar View</button>
            <button className="button" onClick={props.onClickAdd}>Add sleep log</button>
          </div>
          <HomeHeader>This week's sleep logs</HomeHeader>
          <WeekDate>{week}</WeekDate>
          <p className="center">{message}</p>
          <div className="button-div">
            <div className="content-pad">
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
            </div>
          </div>
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