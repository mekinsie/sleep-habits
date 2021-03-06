import React, {useState} from 'react';
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";
import "firebase/auth";

function Login() {

  const [message, editMessage] = useState(null)
  const history = useHistory();
  const auth = firebase.auth();

  const doLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
      editMessage("Successfully logged in!")
      history.push("/")
    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      console.log(result.user)
      editMessage("Successfully logged in!")
      history.push("/")
    }).catch((error) => {
      console.log(error.message)
      editMessage(`Error: ${error.message}`)
    })
  }

  return(
    <React.Fragment>
      <div className="card center">
        <h1>Sleep Habits</h1><br></br>
        <h2>Log in</h2>
        <form className="form" onSubmit={doLogIn}>
          <input type='text' name='email' placeholder='Email'/><br></br>
          <input type='password' name='password' placeholder='Password'/>
          <button className="button" type='submit'>Log In</button>
        </form>
        <p> OR </p>
        <div className="login-buttons">
        <button className="login-provider-button button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
        </button>
        </div>
        <p>{message}</p>
        <p>Don't have an account?</p><Link to="/signup">Sign up</Link>
      </div>
    </React.Fragment>
  )

}

export default Login;