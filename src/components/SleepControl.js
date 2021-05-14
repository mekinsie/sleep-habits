import React from "react";
import SleepHome from './SleepHome';
// import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase'
import NewSleepForm from "./NewSleepForm";
import SleepDetail from "./SleepDetail";
import EditSleepForm from "./EditSleepForm";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserSettings from "./UserSettings";
import firebase from "firebase/app";


class SleepControl extends React.Component {

  constructor(props){
    super(props);
    firebase.auth().onAuthStateChanged((user)=> {
      this.setState({ user: user });
    });
    this.state={
      selectedSleep: null,
      editing: false,
      formVisible: false,
      settingsVisible: false,
    }
  }



  handleEditingSleep = () => {
    this.setState({
      editing: false,
      selectedSleep: null,
      user: null,
      settingsVisible: false
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
        editing: false,
        settingsVisible: false
      });
    } else {
      this.setState(prevState => ({
        formVisible: !prevState.formVisible
      }));
    }
  }

  handleClickHome = () => {
    this.setState({
      formVisible: false,
      selectedSleep: null,
      editing: false,
      settingsVisible: false
    });
  }

  handleClickSettings = () => {
    this.setState({
      formVisible: false,
      selectedSleep: null,
      editing: false,
      settingsVisible: true
    });
  }

  render(){
    const auth = this.props.firebase.auth();
    
    if(!isLoaded(auth)){
      return (
        <React.Fragment>
          <h1 className="center">Loading...</h1>
        </React.Fragment>
      )
    }

    if(isLoaded(auth) && auth.currentUser == null){
      return (
        <React.Fragment>
          <div className="welcome">
            <h1 className="center">Welcome to Sleep Habits</h1>
          </div>
          <Link to="/login"><button>Log in</button></Link>
          <Link to="/signup"><button>Create New Account</button></Link>
        </React.Fragment>
      )
    }

    if(isLoaded(auth) && auth.currentUser != null){
      let currentView = null;

      if (this.state.settingsVisible){
        currentView = <UserSettings />
      } else if (this.state.editing){
        currentView = <EditSleepForm sleep={this.state.selectedSleep} onEditSleep={this.handleEditingSleep} />
      } else if (this.state.selectedSleep != null){
        currentView = <SleepDetail sleep={this.state.selectedSleep} onClickingEdit={this.handleEditClick} onClickingDelete={this.handleDeletingSleep} />
      } else if (this.state.formVisible){
        currentView = <NewSleepForm onNewSleepCreation={this.handleAddSleep} />
      } else {
        currentView = <SleepHome userEmail={auth.currentUser.email} onClickAdd={this.handleClick} onSleepSelection={this.handleSelectSleep} />
      }
      return(
        <React.Fragment>
            <Nav onClickSettings={this.handleClickSettings} onClickHome={this.handleClickHome} />
            {/* <button onClick={this.handleClick}>{buttonText}</button> */}
            {currentView}
        </React.Fragment>
      )
    }
  }
}

export default withFirestore(SleepControl);