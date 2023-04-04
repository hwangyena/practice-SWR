import styled from '@emotion/styled';
import { Settings } from '@mui/icons-material';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { MouseEvent, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../apis/auth';

const LayoutWrapper = styled.div({
  margin: '2% 3%',
});

const LayoutHeader = styled.header({
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
});

const Layout = () => {
  const [menu, setMenu] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const handleLogout = async () => {
    const { success: data } = await logout();

    if (data) {
      navigate('/login');
    }
  };

  return (
    <LayoutWrapper>
      <LayoutHeader>
        <Typography sx={{ color: green[800] }} variant='h3'>
          blog
        </Typography>
        <Button
          onClick={handleOpenMenu}
          aria-haspopup='true'
          color='success'
          aria-controls={!!menu ? 'basic-menu' : undefined}
        >
          MENU
        </Button>
        <Menu
          open={!!menu}
          onClose={handleCloseMenu}
          id='basic-menu'
          anchorEl={menu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </LayoutHeader>
      <Box sx={{ display: 'flex' }}>
        <Outlet />
      </Box>
    </LayoutWrapper>
  );
};

export default Layout;
