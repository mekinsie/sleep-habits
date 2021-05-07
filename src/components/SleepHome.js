import React from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function SleepHome(){

  const lastWeek = (date) =>{
    const newDate = new Date()
    const weekDate = new Date()
    weekDate.setTime(newDate.getTime()-(7*24*3600000));
    let day = weekDate.getDate()
    let month = weekDate.getMonth() + 1
    let year = weekDate.getFullYear()
    if (month < 10 && day < 10){
      date = `${year}-0${month}-0${day}`
    } else if (month < 10) {
      date = `${year}-0${month}-${day}`
    } else if (day < 10) {
      date = `${year}-${month}-0${day}`
    } else {
      date = `${year}-${month}-${day}`
    }
    return date
  }
  // console.log(date);

  // useFirestoreConnect([
  //   {collection: 'sleepData', orderByChild: [['date']], startAt(date)}
  // ]);

  useFirestoreConnect([
    {collection: 'sleepData'}
  ]);

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  // const thisWeek = sleepDate.where()

  if (isLoaded(sleepData)){
    let date;
    date = lastWeek(date);

    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          {/* {sleepData.map((day)=>{
          })} */}
        <h1>This week's data:</h1>
        <p>{sleepData[0].date}</p>
        <p>Wake Time: {sleepData[0].wakeTime}</p>
        <p>Bed Time: {sleepData[0].bedTime}</p>
        <p>Energy Level: {sleepData[0].energyLevel}</p>
        <p>Mood Level: {sleepData[0].mood}</p>
        <p></p>
        <p>{sleepData[1].date}</p>
        <p>Wake Time: {sleepData[1].wakeTime}</p>
        <p>Bed Time: {sleepData[1].bedTime}</p>
        <p>Energy Level: {sleepData[1].energyLevel}</p>
        <p>Mood Level: {sleepData[1].mood}</p>
        <p></p>
        <p>{sleepData[2].date}</p>
        <p>Wake Time: {sleepData[2].wakeTime}</p>
        <p>Bed Time: {sleepData[2].bedTime}</p>
        <p>Energy Level: {sleepData[2].energyLevel}</p>
        <p>Mood Level: {sleepData[2].mood}</p>
        {console.log(sleepData)}
        </FadeIn>
      </React.Fragment>
    )
  } else {
    return (
      <>
        <span className="center"><h3> Loading... </h3></span>
      </>
    );
  }
}

export default SleepHome;