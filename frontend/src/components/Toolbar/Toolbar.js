import React from 'react';
import styles from './Toolbar.module.css';
// Import the day and night icons
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const Toolbar = ({ onThemeToggle, onLogout, isDarkTheme }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>
      <button className={styles.themeToggle} onClick={onThemeToggle}>
        {/* Conditionally render the day or night icon */}
        {isDarkTheme ? <WbSunnyIcon /> : <NightsStayIcon />}
      </button>
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Toolbar;