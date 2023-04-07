import React, { useState } from 'react';
import './Toolbar.css';

const Toolbar = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`toolbar ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Other toolbar content */}
    </div>
  );
};

export default Toolbar;