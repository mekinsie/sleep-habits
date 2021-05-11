import React from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import SleepDay from './SleepDay'
import styled from 'styled-components';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

const HomeHeader = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  `;

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

  useFirestoreConnect(() => {
    let date;
    date = lastWeek(date);
    return [
      {collection: 'sleepData', where: [["date", ">=", `${date}`, console.log(date)]], orderBy: [["date", "desc"]]}
    ]
  });

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  if (isLoaded(sleepData)){
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          {/* <div>
            <button>See month</button>
            <button>See year</button>
          </div> */}
          <HomeHeader>This week's sleep data:</HomeHeader>
          <div className="bar-chart">
            <XYPlot
              xType="ordinal"
              width={300}
              height={300}>
              {/* <HorizontalGridLines /> */}
              <VerticalBarSeries
                color="#b6a4e0"
                data={[
                  {x: "Monday", y: 10},
                  {x: "Tuesday", y: 5},
                  {x: "Wednesday", y: 15}
                ]}/>
              <XAxis title="Day of Week"/>
              <YAxis title="Total Hours of Sleep"/>
            </XYPlot>
          </div>

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

export default SleepHome;