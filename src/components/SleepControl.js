import React from "react";
import SleepHome from './SleepHome';
// import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase'
import NewSleepForm from "./NewSleepForm";
import SleepDetail from "./SleepDetail";
import EditSleepForm from "./EditSleepForm";
import { Link } from "react-router-dom";
import Nav from "./Nav";


class SleepControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedSleep: null,
      editing: false,
      formVisible: false,
      user: null
    }
  }

  handleEditingSleep = () => {
    this.setState({
      editing: false,
      selectedSleep: null,
      user: null
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
        editing: false
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
      editing: false
    });
  }

  render(){
    const auth = this.props.firebase.auth();

    if(!isLoaded(auth)){
      return (
        <React.Fragment>
          <Nav />
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
      console.log(auth.currentUser.email)
      let currentView = null;
      if (this.state.editing){
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
            <Nav onClickHome={this.handleClickHome} />
            {/* <button onClick={this.handleClick}>{buttonText}</button> */}
            {currentView}
        </React.Fragment>
      )
    }
  }
}

export default withFirestore(SleepControl);