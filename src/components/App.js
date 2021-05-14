import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SleepControl from './SleepControl';
import Login from './Login';
import Signup from './Signup';
import Stars from './Stars';


function App() {
  return (
    <Router>
      <Stars/>
      <div className="container">
      <div className="moving_shape"></div>
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <SleepControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
