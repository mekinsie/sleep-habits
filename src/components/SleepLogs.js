import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import SleepDay from './SleepDay'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HomeHeader = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-family: 'Cormorant', serif;
  `;

function SleepLogs(props){
  const [value, setValue] = useState(new Date());
  const [calendarVisible, toggleCalendar] = useState(true);

  const onChange = (nextValue) => {
    setValue(nextValue)
  }

  const reformatDate = (calendarDate) => {
    let newDate = '';
    let day = calendarDate.getDate();
    let month = calendarDate.getMonth()+1;
    let year = `20${calendarDate.getYear().toString().substring(1,3)}`;
    if (month < 10 && day < 10){
      newDate = `${year}-0${month}-0${day}`
    } else if (month < 10) {
      newDate = `${year}-0${month}-${day}`
    } else if (day < 10) {
      newDate = `${year}-${month}-0${day}`
    } else {
      newDate = `${year}-${month}-${day}`
    }
    return newDate
  }

  useFirestoreConnect(() => {
    let date;
    date = props.lastWeek(date);
    return [
      {collection: 'sleepData', where: [["date", ">=", `${date}`], ["userEmail", "==", `${props.userEmail}`]], orderBy: [["date", "desc"]]}
    ]
  });

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  const filteredDay = (selectedDate, sleepData) => {
    return sleepData.filter(day => day.date === selectedDate);
  }

  if (isLoaded(sleepData)){
    let displayDay;
    let message;
    let calendarDate = reformatDate(value)
    let selectedDay = filteredDay(calendarDate, sleepData);
    if(selectedDay.length > 0){
      displayDay =
      <SleepDay
      whenSleepClicked = {props.onSleepSelection}
      date = {selectedDay[0].date}
      bedTime = {selectedDay[0].bedTime}
      wakeTime = {selectedDay[0].wakeTime}
      energyLevel = {selectedDay[0].energyLevel}
      mood = {selectedDay[0].mood}
      id = {selectedDay[0].id}
      key={selectedDay[0].id}
      sleep={selectedDay[0]}
      />;
    } else {
      displayDay = 'The selected day does not have a sleep log'
    }
    console.log(selectedDay)
    if (sleepData.length == 0){
      message = 'Add a sleep log to get started!'
    }
    

    if (calendarVisible){
      return(
        <React.Fragment>
          <FadeIn transitionDuration='1000'>
            <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>List View</button>
            <button className="button" onClick={props.onClickAdd}>Add sleep log</button>
            <div className="calendar">
              <Calendar
                onChange={onChange}
                value={value}
              />
            </div>
            {console.log(reformatDate(value))}
            <HomeHeader>Selected Day</HomeHeader>
            <div className="center">{displayDay}</div>
          </FadeIn>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <button className="button" onClick={() => toggleCalendar(!calendarVisible)}>Calendar View</button>
          <button className="button" onClick={props.onClickAdd}>Add sleep log</button>
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