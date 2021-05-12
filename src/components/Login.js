import React from 'react';
import firebase from "firebase/app";
import { Link } from "react-router-dom";

function Login(){
  return(
    <React.Fragment>
      <h1 class="center">Log in</h1>
      <button>Login</button>
      <Link to="/signup"><button> Create New Account</button></Link>
    </React.Fragment>
  )
}

export default Login;