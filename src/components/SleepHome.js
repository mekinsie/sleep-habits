import React from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, withFirestore } from 'react-redux-firebase';
import SleepDay from './SleepDay'

function SleepHome(props){

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

console.log(props.firestore.collection('sleepData').where("date", ">=", "2021-04-30"))

  //.collection("sleepData").where("date", ">=", "2021-04-30").orderBy("", "asc")

  useFirestoreConnect((date) => [
      {collection: 'sleepData', where: [
        ["date", ">=", '2021-05-01']
      ]
      }
    ]);

  // useFirestoreConnect((date) => [
  //   {collection: 'sleepData', queryParams: ['orderByChild=date']}
  // ]);

  // useFirestoreConnect((date) => [
  //   {collection: 'sleepData'}
  // ]);

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  if (isLoaded(sleepData)){
    let date;
    date = lastWeek(date);

    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <div>
            <button>See month</button>
            <button>See year</button>
          </div>
          <h1>This week's sleep data:</h1>
          {sleepData.map((day)=>{
            return <SleepDay
            whenSleepClicked = {props.onSleepSelection}
            date = {day.date}
            wakeTime = {day.wakeTime}
            bedTime = {day.bedTime}
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

SleepHome.propTypes = {
  onSleepSelection: PropTypes.func
};

export default withFirestore(SleepHome);