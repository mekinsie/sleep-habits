import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SleepControl from './SleepControl';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="container">
      <div className="moving_shape"></div>
      </div>

      <div className="stars">
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
        <div className="p"></div>
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
