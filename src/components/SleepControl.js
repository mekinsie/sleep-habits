import React from "react";
import SleepHome from './SleepHome';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'
import NewSleepForm from "./NewSleepForm";


class SleepControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedDay: null,
      editing: false,
      formVisible: false
    }
  }

  handleAddSleep = () => {
    this.setState(prevState => ({
      formVisible: !prevState.formVisible
    }));
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisible: !prevState.formVisible
    }));
  }

  render(){
    let currentView = null;
    let buttonText = null;
    if(this.state.formVisible){
      currentView = <NewSleepForm onNewSleepCreation = {this.handleAddSleep} />
      buttonText = "Return home"
    } else {
      currentView = <SleepHome />
      buttonText = "Add sleep data"
    }
    return(
      <React.Fragment>
          <button onClick={this.handleClick}>{buttonText}</button>
          {currentView}
      </React.Fragment>
    )
  }
}

export default withFirestore(SleepControl);