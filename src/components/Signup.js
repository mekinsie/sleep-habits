import React, {useState} from 'react';
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";

function Signup(){

  const [message, editMessage] = useState(null)
  const history = useHistory();

  const doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      editMessage("Successfully signed up!")
      history.push("/")
    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }
    return(
      <React.Fragment>
        <div className="card center">
          <h1>Sleep Habits</h1><br></br>
          <h2>Sign up</h2>
          <form className="form" onSubmit={doSignUp}>
            <input type='text' name='email' placeholder='Email'/>
            <input type='password' name='password' placeholder='Password'/>
            <button type='submit'>Sign up</button>
          </form>
          <p >{message}</p>
          <p>Have an account?</p><Link to="/login">Log in</Link>
        </div>
      </React.Fragment>
    )
}

export default Signup;