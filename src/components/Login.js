import React, {useState} from 'react';
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";

function Login() {

  const [message, editMessage] = useState(null)
  const history = useHistory();

  const doLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      editMessage("Successfully logged in!")
      history.push("/")
    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }

  return(
    <React.Fragment>
      <div className="card">
        <h1 className="center">Sleep Habits</h1><br></br>
        <h2 className="center">Log in</h2>
        <form className="form" onSubmit={doLogIn}>
          <input type='text' name='email' placeholder='Email'/>
          <input type='password' name='password' placeholder='Password'/>
          <button type='submit'>Log In</button>
        </form>
        <p className="center" >{message}</p>
        <Link to="/signup"><button> Create New Account</button></Link>
      </div>
    </React.Fragment>
  )

}

export default Login;