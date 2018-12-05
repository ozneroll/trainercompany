import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import CustomerList from './components/CustomerList'
import TrainingsList from './components/TrainingsList'
import Calendar from './components/Calendar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <nav>
            <Link to="/">Calendar</Link>{''}
            <Link to="/trainings">Trainings</Link>{''}
            <Link to="/customers">Customers</Link>{''}
            
          </nav>
          <hr></hr>
          
          <Switch>
          <Route exact path="/" component={Calendar}/>
          <Route path="/trainings" component={TrainingsList}/>
          <Route path="/customers" component={CustomerList}/>
          <Route render={()=> <h1>Page not found</h1>}/>
          </Switch>
        </div>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
