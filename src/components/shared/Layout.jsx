import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  CssBaseline,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MenuBook as LibraryIcon,
  School as TeacherIcon,
  Person as StudentIcon,
  FamilyRestroom as ParentIcon,
  CloudDownload as CloudDownloadIcon,
  SwapHoriz as SwapHorizIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const location = useLocation();
  const { currentUser } = useAuth();

  const mainLinks = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: `/dashboard/${currentUser?.role}` },
    { text: 'Students', icon: <PeopleIcon />, path: '/students', roles: ['admin', 'teacher'] },
    { text: 'Library', icon: <LibraryIcon />, path: '/library', roles: ['admin', 'teacher', 'student'] },
  ];

  const adminLinks = [
    { text: 'Physical Books', icon: <MenuBookIcon />, path: '/library/physical-books' },
    { text: 'Digital Resources', icon: <CloudDownloadIcon />, path: '/library/digital-resources' },
    { text: 'Circulation', icon: <SwapHorizIcon />, path: '/library/circulation' },
  ];

  const filteredMainLinks = mainLinks.filter(link => 
    !link.roles || link.roles.includes(currentUser?.role)
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Excel International Schools
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Spacer for app bar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {filteredMainLinks.map((link) => (
              <ListItem 
                button 
                key={link.text} 
                component={Link} 
                to={link.path}
                selected={location.pathname.startsWith(link.path)}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
          
          {currentUser?.role === 'admin' && (
            <>
              <Divider />
              <List>
                {adminLinks.map((link) => (
                  <ListItem 
                    button 
                    key={link.text} 
                    component={Link} 
                    to={link.path}
                    selected={location.pathname === link.path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Spacer for app bar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;