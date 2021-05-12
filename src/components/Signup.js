import React, {useState} from 'react';
import firebase from "firebase/app";
import { Link } from "react-router-dom";

function Signup(){

  const [message, editMessage] = useState(null)

  const doSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      editMessage("Successfully signed up!")

    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }
    return(
      <React.Fragment>
        <div className="card">
          <h1 className="center">Sign up</h1>
          <form className="form" onSubmit={doSignUp}>
            <input type='text' name='email' placeholder='Email'/>
            <input type='password' name='password' placeholder='Password'/>
            <button type='submit'>Sign up</button>
          </form>
          <p className="center" >{message}</p>
          <Link to="/login"><button> Log In</button></Link>
        </div>
      </React.Fragment>
    )
}

export default Signup;