import React from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

export default function ThemeToggle({ toggleTheme }) {
  return (
    <div className="theme-toggle">
      <DarkModeRoundedIcon onClick={toggleTheme} style={{cursor: "pointer"}}/>
    </div>
  );
};
