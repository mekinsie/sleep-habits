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
  margin-top: 30px;
  font-family: 'Cormorant', serif;

  `;

  const GraphTitle = styled.h2`
  text-align: center;
  margin-top: 50px;
  // font-family: Boska-Medium;
  font-family: 'Cormorant', serif;
  `;

  const Welcome = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  font-family: 'Cormorant', serif;
  `;

  const Notes = styled.p`
  width: 430px;
  font-size: 13px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  opacity: 0.5;
  `;

function SleepHome(props){

  useFirestoreConnect(() => {
    let date;
    date = props.lastWeek(date);
    return [
      {collection: 'sleepData', where: [["date", ">=", `${date}`], ["userEmail", "==", `${props.userEmail}`]], orderBy: [["date", "asc"]]}
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
        graphData.push({ x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: 24 - (calculateSleepHours(data, i)) })
      } else {
        graphData.push({x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: (calculateSleepHours(data, i))
        })
      }
    }
    return graphData;
  }

  const getMoodData = (data) => {
    let moodData = []
    for(let i=0; i < data.length; i++){
        moodData.push({ x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: data[i].mood })
      }
    return moodData;
  }
  const getEnergyData = (data) => {
    let energyData = []
    for(let i=0; i < data.length; i++){
        energyData.push({ x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: data[i].energyLevel })
      }
    return energyData;
  }

  const getWakeData = (data) => {
    let wakeData = []
    for(let i=0; i < data.length; i++){
        wakeData.push({ x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: (parseInt(data[i].wakeTime.substring(0,2))) + (parseInt(data[i].wakeTime.substring(3,5))/60) })
      }
    return wakeData;
  }

  const getBedData = (data) => {
    let bedData = []
    for(let i=0; i < data.length; i++){
        bedData.push({ x: `${data[i].date.substring(5,7)}/${data[i].date.substring(8,10)}`, y: (parseInt(data[i].bedTime.substring(0,2))) + (parseInt(data[i].bedTime.substring(3,5))/60) })
      }
    return bedData;
  }

  if (isLoaded(sleepData)){
    console.log(sleepData)
    let message;
    let week;
    if (sleepData.length == 0){
      message = 'Add a sleep log to start seeing data! Each log will need a wake time and a bed time to show up on the graph.'
    } else {
      week = `${sleepData[0].date.substring(5,7)}/${sleepData[0].date.substring(8,10)} - ${sleepData[sleepData.length -1].date.substring(5,7)}/${sleepData[sleepData.length-1].date.substring(8,10)}`
    }
    const graphData = getGraphData(sleepData)
    const wakeData = getWakeData(sleepData)
    const bedData = getBedData(sleepData)
    const moodData = getMoodData(sleepData)
    const energyData = getEnergyData(sleepData)
    return(
      <React.Fragment>
        <FadeIn transitionDuration='1000'>
          <Welcome>
            <h1 className="center">Welcome!</h1>
            <p>Track your sleep habits by inputting your sleep time and wake time for each day. The goal is to have have a consistent schedule where you wake up and go to bed at the same time everyday. The graphs below can help you to visualize which days need better sleep habits.</p>
          </Welcome>
          <button onClick={props.onClickAdd}>Add sleep log</button>
          <HomeHeader>This week's sleep data :</HomeHeader>
          <HomeHeader>{week}</HomeHeader>
          <p className="center">{message}</p>
          <GraphTitle>Hours of Sleep</GraphTitle>
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
              <XAxis title="Date" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
              <YAxis title="Total Hours of Sleep" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
            </XYPlot>
          </div>
          <Notes>The National Sleep Foundation guidelines advise that healthy adults need between 7 and 9 hours of sleep per night.</Notes>
          <GraphTitle>Mood Levels</GraphTitle>
          <div>
            <XYPlot
              xType="ordinal"
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines />
              <VerticalBarSeries
                color="#b6a4e0"
                data={ moodData }/>
              <XAxis title="Date" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
              <YAxis title="Mood Level" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
            </XYPlot>
          </div>
          <GraphTitle>Energy Levels</GraphTitle>
          <div>
            <XYPlot
              xType="ordinal"
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines />
              <VerticalBarSeries
                color="#b6a4e0"
                data={ energyData }/>
              <XAxis title="Date" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
              <YAxis title="Energy Level" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
            </XYPlot>
          </div>
          <GraphTitle>Wake Times</GraphTitle>
          <div>
            <XYPlot
              xType="ordinal"
              yType="linear"
              yDomain={[0,24]}
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines
              tickTotal = {24}
              width={6}
              style={{
                stroke: 'white',
                opacity: '0.2'
                }}
                />
              <LineSeries
                color="#b6a4e0"
                data={ wakeData }/>
              <XAxis title="Date" style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}
                />
              <YAxis title="Wake Times (24 hour clock)" style={{
                fill: 'white',
                line: {stroke: 'white'},
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
            </XYPlot>
          </div>
          <GraphTitle>Bed Times</GraphTitle>
          <div>
            <XYPlot
              xType="ordinal"
              yType="linear"
              // yRange={[1]}
              // yDomain={[12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11]}
              // yDomain={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}
              // yDomain={[12,13,14,15,16,17,18,19,20,21,22,23,24,1,2,3,4,5,6,7,8,9,10,11]}
              width={500}
              height={300}
              className="bar-chart">
              <HorizontalGridLines
              tickTotal = {24}
              width= {6}
              style={{
                stroke: 'white',
                opacity: '0.2'
                }}
              />
              <LineSeries
                color="#b6a4e0"
                data={ bedData }/>
              <XAxis
              title="Date"
              style={{
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}/>
              <YAxis
                title="Bed Times (24 hour clock)"
                style={{
                // line: {stroke: 'black'},
                // ticks: {stroke: 'black'},
                fill: 'white',
                text: {stroke: 'none', fill: 'white', fontWeight: 500}}}
              />
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