import React from 'react';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import styled from 'styled-components';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, LineSeries} from 'react-vis';

const HomeHeader = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  `;

function SleepHome(props){

  useFirestoreConnect(() => {
    let date;
    date = props.lastWeek(date);
    return [
      {collection: 'sleepData', where: [["date", ">=", `${date}`], ["userEmail", "==", `${props.userEmail}`]], orderBy: [["date", "desc"]]}
    ]
  });

  const sleepData = useSelector(state => state.firestore.ordered.sleepData);

  const calculateSleepHours = (data, i) => {
    return Math.abs( (parseInt(data[i].bedTime.substring(0,2))) + (parseInt(data[i].bedTime.substring(3,5))/60) - (parseInt(data[i].wakeTime.substring(0,2)) + (parseInt(data[i].wakeTime.substring(3,5))/60)) )
  }
  const getGraphData = (data) => {
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

  const getWakeData = (data) => {
    let wakeData = []
    for(let i=0; i < data.length; i++){
        wakeData.push({ x: data[i].date, y: (parseInt(data[i].wakeTime.substring(0,2))) + (parseInt(data[i].wakeTime.substring(3,5))/60) })
      }
      return wakeData;
    }

  if (isLoaded(sleepData)){
    console.log(sleepData)
    let message;
    if (sleepData.length == 0){
      message = 'Add a sleep log to start seeing data! Each log will need a wake time and a bed time to show up on the graph.'
    }
    const graphData = getGraphData(sleepData)
    const wakeData = getWakeData(sleepData)
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
          <HomeHeader>Hours of Sleep</HomeHeader>
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
              <XAxis title="Date"/>
              <YAxis title="Total Hours of Sleep"/>
            </XYPlot>
          </div>
          <HomeHeader>Wake Times</HomeHeader>
          <div>
            <XYPlot
              xType="ordinal"
              yType="linear"
              yDomain={[0,24]}
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines />
              <LineSeries
                color="#b6a4e0"
                data={ wakeData }/>
              <XAxis title="Date"/>
              <YAxis title="Wake Times (24 hour clock)"/>
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
  userEmail: PropTypes.string,
  thisWeek: PropTypes.func
};

export default SleepHome;