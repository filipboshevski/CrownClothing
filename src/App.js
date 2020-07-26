import React from 'react';
import './App.css';
import HomePage from './components/pages/Homepage/HomePage';
import { Route, Switch } from 'react-router-dom';
import Shop from './components/pages/Shop/Shop';
import Header from './components/header/Header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact component={HomePage} path='/'/>
        <Route component={Shop} path='/shop'/>
      </Switch>
    </div>
  );
}

export default App;
