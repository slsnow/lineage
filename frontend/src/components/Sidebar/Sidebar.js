import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';

const SidebarItem = ({ label, children, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isCurrentPage = currentPage === label;

  return (
    <ListItem button onClick={handleClick} className={isCurrentPage ? styles['current-page'] : ''}>
      <ListItemText primary={label} />
      {children && (
        <ListItemIcon className={styles.indicator}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      )}
      {children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
};

const Sidebar = () => {
  const currentPage = 'Details'; // Replace this with the actual value of the current page
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      {isVisible && (
        <div className={styles.sidebar}>
          <List>
            <SidebarItem label="Tree" currentPage={currentPage}>
              <SidebarItem label="Ancestors" currentPage={currentPage} />
              <SidebarItem label="Descendants" currentPage={currentPage} />
              <SidebarItem label="Fan Chart" currentPage={currentPage} />
            </SidebarItem>
            <SidebarItem label="Person" currentPage={currentPage}>
              <SidebarItem label="Details" currentPage={currentPage} />
              <SidebarItem label="Facts" currentPage={currentPage} />
              <SidebarItem label="Notes" currentPage={currentPage} />
            </SidebarItem>
          </List>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
