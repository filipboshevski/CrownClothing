import React from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path='/'/>
        <Route component={Shop} path='/shop'/>
      </Switch>
    </div>
  );
}

export default App;
