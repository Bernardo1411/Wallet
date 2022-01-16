import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

function App() {
  return (
    <div className="main_page">
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" exact component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
