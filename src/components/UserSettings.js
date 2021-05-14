import React, {useState} from 'react';
import firebase from "firebase/app";
import FadeIn from 'react-fade-in';

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
        <p>Update Password:</p>
        <form className="form" onSubmit={doChangePass}>
          <input type='password' name='password' placeholder='New Password'/>
          <button type='submit'>Update Password</button>
        </form>
        <p >{message}</p>
      </FadeIn>
    </React.Fragment>
  )
}

export default UserSettings;