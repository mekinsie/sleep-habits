import React from "react";
import SleepHome from './SleepHome';
// import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase'
import NewSleepForm from "./NewSleepForm";
import SleepDetail from "./SleepDetail";
import EditSleepForm from "./EditSleepForm";

class SleepControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedSleep: null,
      editing: false,
      formVisible: false
    }
  }

  handleEditingSleep = () => {
    this.setState({
      editing: false,
      selectedSleep: null,
    })
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

  handleEditClick = () => {
    this.setState({editing: true});
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
    if (this.state.editing){
      currentView = <EditSleepForm sleep={this.state.selectedSleep} onEditSleep={this.handleEditingSleep} />
      buttonText = "Return home"
    } else if (this.state.selectedSleep != null){
      currentView = <SleepDetail sleep={this.state.selectedSleep} onClickingEdit={this.handleEditClick} onClickingDelete={this.handleDeletingSleep} />
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