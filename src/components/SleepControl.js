import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// import * as a from './../actions';

class SleepControl extends React.Component {
  render(){
    let currentView = null;
    let buttonText = null;
    return(
      <React.Fragment>
        <button>{buttonText}</button>
        {currentView}

        <h1>This is The main page</h1>
      </React.Fragment>
    )
  }
}