import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import SidebarComponent from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import FilePage from './pages/FilePage';
import People from './pages/People';
import Search from './pages/Search';
import Sources from './pages/Sources';
import Preferences from './pages/Preferences';

function App() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ display: "flex", height: "100vh" }} className={`App ${theme}`}>
      <ThemeToggle toggleTheme={toggleTheme} />
      <SidebarComponent />
      <section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/file" component={FilePage} />
          <Route path="/people" component={People} />
          <Route path="/search" component={Search} />
          <Route path="/sources" component={Sources} />
          <Route path="/preferences" component={Preferences} />
        </Switch>
      </section>
    </div>
  );
}

export default App;