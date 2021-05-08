import React from "react";
import SleepHome from './SleepHome';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'
import NewSleepForm from "./NewSleepForm";
import SleepDetail from "./SleepDetail";


class SleepControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedSleep: null,
      editing: false,
      formVisible: false
    }
  }

  handleDeletingSleep = (id) => {
    this.props.firestore.delete({collection: 'sleepData', doc: id});
    this.setState({
      selectedSleep: null,
    });
  }

handleSelectSleep = (sleep) => {
  const selectedSleep = sleep
  this.setState({selectedSleep: selectedSleep})
  console.log(selectedSleep)
}

  handleAddSleep = () => {
    this.setState(prevState => ({
      formVisible: !prevState.formVisible
    }));
  }

  handleClick = () => {
    if (this.state.selectedSleep != null){
      this.setState({
        formVisible: false,
        selectedSleep: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisible: !prevState.formVisible
      }));
    }
  }

  render(){
    let currentView = null;
    let buttonText = null;
    if (this.state.selectedSleep != null){
      currentView = <SleepDetail sleep={this.state.selectedSleep} onClickingDelete={this.handleDeletingSleep} />
      buttonText = "Return home"
    } else if (this.state.formVisible){
      currentView = <NewSleepForm onNewSleepCreation={this.handleAddSleep} />
      buttonText = "Return home"
    } else {
      currentView = <SleepHome onSleepSelection={this.handleSelectSleep} />
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