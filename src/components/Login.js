import React from 'react';
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: null
    }
  }

  doLogIn = (event) => {
    const history = useHistory();
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.setState({
        message: "Successfully logged in!"
      })
      history.push("/")
    }).catch((error) => {
      this.setState({
        message: `Error: ${error.message}`
      })
    });
  }

  render(){
    return(
      <React.Fragment>
        <h1 className="center">Log in</h1>
        <form className="form" onSubmit={this.doLogIn}>
          <input type='text' name='email' placeholder='Email'/>
          <input type='password' name='password' placeholder='Password'/>
          <button type='submit'>Log In</button>
        </form>
        <p className="center" >{this.state.message}</p>
        <Link to="/signup"><button> Create New Account</button></Link>
      </React.Fragment>
    )
  }

}

export default Login;