import React from 'react';
import firebase from "firebase/app";

class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: null
    }
  }

  doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.setState({
        message: "Successfully signed up!"
      })
    }).catch((error) => {
      this.setState({
        message: `Error signing up: ${error.message}`
      })
    });
  }
  render(){
    return(
      <React.Fragment>
        <h1 className="center">Sign up</h1>
        <form className="form" onSubmit={this.doSignUp}>
          <input type='text' name='email' placeholder='Email'/>
          <input type='password' name='password' placeholder='Password'/>
          <button type='submit'>Sign up</button>
        </form>
        <p className="center" >{this.state.message}</p>
      </React.Fragment>
    )
  }
}

export default Signup;