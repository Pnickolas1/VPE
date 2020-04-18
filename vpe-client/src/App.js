import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import './App.css';


import AdminLayout from './Layout/Layout'
import Surveys from './Main/Surveys'
import Choices from './Main/Choices'

function Routes({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      <AdminLayout {...props} render={() => <Component {...props} />}/>
      )}
    />
  )
}



function VPE() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Routes exact path="/" component={Surveys}/>
          <Routes exact path="/:id" component={Choices}/>
        </Switch>
      </Router>
    </div>
  );
}


export default VPE;
