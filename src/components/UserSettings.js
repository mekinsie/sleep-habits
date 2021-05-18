import React, {useState} from 'react';
import firebase from "firebase/app";
import FadeIn from 'react-fade-in';
import { Link } from "react-router-dom";

function UserSettings(){

  const [message, editMessage] = useState(null)
  const auth = firebase.auth();

  const doChangePass = (event) => {
    event.preventDefault();
    const password = event.tartget.password.value;
    auth.updatePassword(password).then(() => {
      editMessage("Password successfully changed");
    }).catch((error) => {
      editMessage(`Error: ${error.message}`)
    });
  }

  return(
    <React.Fragment>
      <FadeIn transitionDuration="1000">
        <h1 className="center">Email: {auth.currentUser.email}</h1>
        <h2 className="center">Update Password:</h2>
        <form className="form" onSubmit={doChangePass}>
          <input type='password' name='password' placeholder='New Password'/>
          <button type='submit'>Update Password</button>
        </form>
        <Link className="link" to="/deleteAccount">Delete my account</Link>
        <p>{message}</p>
      </FadeIn>
    </React.Fragment>
  )
}

export default UserSettings;