import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggle, setToggle] = useState(props.auth?.user?.userType === 'creator' ? false: true);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if(props.auth?.user?.userType === 'client')
    {
      props.handleProfile();
    }
  }, []);

  const handleCloseMenu = (action) => {
    if (action === "logout") {
      props.onClick();
    } else if (action === "Edit Profile") {
      navigate("/editprofile");
    } else if (action === "My Profile") {
      navigate("/creatorProfile", { state: props.auth.user });
    }
    else if (action === "switch") {
      props.handleProfile();
      setToggle(!toggle);
    }
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton onClick={handleOpenMenu} size="small" sx={{ ml: 2, p: 0 }}>
          <Avatar sx={{ width: 45, height: 45 }}>
            {props.auth.user.name.split(" ").map((word) => word.charAt(0))}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <MenuItem onClick={() => handleCloseMenu("My Profile")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu("Edit Profile")}>
          <ListItemIcon>
            <ModeEditIcon />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>
        {
          (props.auth?.user?.userType === 'creator' || props.auth?.user?.userType === 'client') &&
          <MenuItem onClick={() => handleCloseMenu("switch")}>
          <ListItemIcon>
            <SwitchAccessShortcutIcon />
          </ListItemIcon>
          <ListItemText>Switch to {!toggle? 'Client': "Creator" }</ListItemText>
        </MenuItem>
        }
        <MenuItem onClick={() => handleCloseMenu("logout")}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
