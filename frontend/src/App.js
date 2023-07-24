import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';


const Home = () => {
  return (
    <>
      <h1 className="header">WELCOME TO LINEAGE</h1>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const File = () => {
  return (
    <>
      <h1 className="header">DASHBOARD PAGE</h1>
      <h3>Welcome User</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const People = () => {
  return (
    <>
      <h1 className="header">PEOPLE PAGE</h1>
      <h3>Stuff</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const Search = () => {
  return (
    <>
      <h1 className="header">PEOPLE PAGE</h1>
      <h3>Stuff</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const Sources = () => {
  return (
    <>
      <h1 className="header">PEOPLE PAGE</h1>
      <h3>Stuff</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const Settings = () => {
  return (
    <>
      <h1 className="header">PEOPLE PAGE</h1>
      <h3>Stuff</h3>
      <p>Lorem ipsum dolor sit amet...</p>
    </>
  );
};

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <DarkModeRoundedIcon onClick={toggleTheme} style={{cursor: "pointer"}}/>
    </div>
  );
};


function App() {
  const { collapseSidebar } = useProSidebar();
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme => theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ display: "flex", height: "100vh" }} className={`App ${theme}`}>
      <ThemeToggle toggleTheme={toggleTheme} />
      <Sidebar className="app dark">
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
          ><h2>LINEAGE</h2>  
          </MenuItem>
          <MenuItem icon={<FolderRoundedIcon />}>
            <Link to="/file" className="link">File</Link>
          </MenuItem>
          <MenuItem icon={<PeopleRoundedIcon />}>
            <Link to="/people" className="link">People</Link>
          </MenuItem>
          <MenuItem icon={<SearchRoundedIcon />}>
            <Link to="/search" className="link">Search</Link>
          </MenuItem>
          <MenuItem icon={<LinkRoundedIcon />}>
            <Link to="/sources" className="link">Sources</Link>
          </MenuItem>
          <SubMenu label="Settings" icon={<SettingsRoundedIcon />}>
            <MenuItem>
              <Link to="/settings" className="link">Preferences</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />}>Logout</MenuItem>

        </Menu>
      </Sidebar>
      <section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/file" component={File} />
          <Route path="/people" component={People} />
          <Route path="/search" component={Search} />
          <Route path="/sources" component={Sources} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </section>
    </div>
  );
}

export default App;