import React from 'react';
import './App.css';
import HomePage from './components/Homepage/HomePage';
import { Route } from 'react-router-dom';

const HatsPage = () => {
  return (
    <div>
      <h1>HATS PAGE</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Route exact component={HomePage} path='/'/>
      <Route component={HatsPage} path='/hats'/>
    </div>
  );
}

export default App;
