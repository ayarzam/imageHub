import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Login from "./componenets/Login";
import App from "./App";
import Signup from './componenets/SignUp'
import Home from './views/UserHome'

class Root extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          {/* <Link to='/'>Home</Link> */}
        </nav>
        <div>
          <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" Component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/upload" component={App} />
        </Switch>
        </div>
        
      </Router>
    );
  }
}

export default Root