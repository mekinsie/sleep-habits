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
      {collection: 'sleepData', where: [["date", ">=", `${date}`], ["userEmail", "==", `${props.userEmail}`]], orderBy: [["date", "desc"]]}
    ]
  });

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  const calculateSleepHours = (data, i) => {
    return Math.abs( (parseInt(data[i].bedTime.substring(0,2))) + (parseInt(data[i].bedTime.substring(3,5))/60) - (parseInt(data[i].wakeTime.substring(0,2)) + (parseInt(data[i].wakeTime.substring(3,5))/60)) )
  }
  const getGraphData = (data)=> {
    let graphData = []
    for(let i=0; i < data.length; i++){
      if (parseInt(data[i].bedTime.substring(0,2)) > 12){
        graphData.push({ x: data[i].date, y: 24 - (calculateSleepHours(data, i)) })
      } else {
        graphData.push({x: data[i].date, y: (calculateSleepHours(data, i))
        })
      }
    }
    return graphData;
  }

  if (isLoaded(sleepData)){
    let message;
    if (sleepData.length == 0){
      message = 'Add a sleep log to start seeing data! Each log will need a wake time and a bed time to show up on the graph.'
    }
    const graphData = getGraphData(sleepData)
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <button onClick={props.onClickAdd}>Add sleep log</button>
          {/* <div>
            <button>See month</button>
            <button>See year</button>
          </div> */}
          <HomeHeader>This week's sleep data:</HomeHeader>
          <p className="center">{message}</p>
          <div>
            <XYPlot
              xType="ordinal"
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines />
              <VerticalBarSeries
                color="#b6a4e0"
                data={ graphData }/>
              <XAxis title="Day of Week"/>
              <YAxis title="Total Hours of Sleep"/>
            </XYPlot>
          </div>
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
  onSleepSelection: PropTypes.func,
  onClickAdd: PropTypes.func,
  userEmail: PropTypes.string
};

export default SleepHome;