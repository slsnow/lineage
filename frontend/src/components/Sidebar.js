import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useProSidebar } from "react-pro-sidebar";

export default function SidebarComponent() {
  const { collapseSidebar } = useProSidebar();

  return (
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
              <Link to="/preferences" className="link">Preferences</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />}>Logout</MenuItem>

        </Menu>
    </Sidebar>
  );
}
