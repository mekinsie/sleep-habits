import React, {useState} from 'react';
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";

function Login() {

  const [message, editMessage] = useState(null)

  const doLogIn = (event) => {
    // const history = useHistory();
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      editMessage("Successfully logged in!")
      console.log("skjdfh")
      // useHistory().push("/")
    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }

  return(
    <React.Fragment>
      <h1 className="center">Log in</h1>
      <form className="form" onSubmit={doLogIn}>
        <input type='text' name='email' placeholder='Email'/>
        <input type='password' name='password' placeholder='Password'/>
        <button type='submit'>Log In</button>
      </form>
      <p className="center" >{message}</p>
      <Link to="/signup"><button> Create New Account</button></Link>
    </React.Fragment>
  )

}

export default Login;