import React from "react";
import SleepHome from './SleepHome';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'

class SleepControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedDay: null,
      editing: false,
      formVisible: false
    }
  }

  render(){
    let currentView = null;
    let buttonText = null;
    currentView = <SleepHome />
    return(
      <React.Fragment>
        <button>{buttonText}</button>
        {currentView}

        <h1>This is The main page</h1>
      </React.Fragment>
    )
  }
}

export default withFirestore(SleepControl);