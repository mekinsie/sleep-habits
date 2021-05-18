import React from "react";
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase'
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
// import { connect } from 'react-redux';
import SleepHome from './SleepHome';
import SleepLogs from './SleepLogs';
import NewSleepForm from "./NewSleepForm";
import SleepDetail from "./SleepDetail";
import EditSleepForm from "./EditSleepForm";
import Nav from "./Nav";


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
      settingsVisible: false,
      logsVisible: false
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
        settingsVisible: false,
        logsVisible: false
      });
    } else {
      this.setState(prevState => ({
        formVisible: !prevState.formVisible
      }));
    }
  }

  handleClickLogs = () => {
    this.setState({
      formVisible: false,
      selectedSleep: null,
      editing: false,
      settingsVisible: false,
      logsVisible: true
    });
  }

  handleClickHome = () => {
    this.setState({
      formVisible: false,
      selectedSleep: null,
      editing: false,
      settingsVisible: false,
      logsVisible: false
    });
  }

  handleClickSettings = () => {
    this.setState({
      formVisible: false,
      selectedSleep: null,
      editing: false,
      settingsVisible: true,
      logsVisible: false
    });
  }

  lastWeek = (date) =>{
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
          <Link to="/login"><button className="button">Log in</button></Link>
          <Link to="/signup"><button className="button">Create New Account</button></Link>
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
      } else if (this.state.logsVisible){
        currentView = <SleepLogs lastWeek={this.lastWeek} userEmail={auth.currentUser.email} onClickAdd={this.handleClick} onSleepSelection={this.handleSelectSleep} />
      } else {
        currentView = <SleepHome lastWeek={this.lastWeek} userEmail={auth.currentUser.email} onClickAdd={this.handleClick} onSleepSelection={this.handleSelectSleep}/>
      }
      return(
        <React.Fragment>
            <Nav onClickSettings={this.handleClickSettings} onClickHome={this.handleClickHome}  onClickLogs={this.handleClickLogs} />
            {/* <button onClick={this.handleClick}>{buttonText}</button> */}
            {currentView}
        </React.Fragment>
      )
    }
  }
}

export default withFirestore(SleepControl);