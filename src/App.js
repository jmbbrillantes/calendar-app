import React, { Component } from "react";
import Add from './components/Add'
import Home from './components/Home'
import NotFound from './components/NotFound'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      item: null
    }

  }

  render() {
    return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/add" component={Add}/>
          {/* <Route path="/edit/:id" exact component={Add}/> */}
          <Route path="/edit/:id" exact item={this.state.item} component={(props) => <Add {...props}/>}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </div>
    )
  }
}

