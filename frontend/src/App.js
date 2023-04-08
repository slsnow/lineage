import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Sidebar from './components/Sidebar/Sidebar';
import Overview from './pages/Overview';
import Tree from './pages/Tree';
import People from './pages/People';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-toolbar">
          <Toolbar />
        </div>
        <div className="app-content">
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Overview} />
            <Route path="/tree" component={Tree} />
            <Route path="/people" component={People} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;