import React from "react";
import SleepControl from './SleepControl';
import Nav from './Nav';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="container">
      <div className="moving_shape"></div>
      </div>
      <SleepControl />
    </React.Fragment>
  );
}



export default App;
