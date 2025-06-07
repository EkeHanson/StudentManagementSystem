import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  CssBaseline,
  styled
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  LibraryBooks as LibraryBooksIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const drawerWidth = 240;
const activityDrawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'leftOpen' && prop !== 'rightOpen' })(
  ({ theme, leftOpen, rightOpen }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin-left', 'margin-right'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: leftOpen ? 0 : `-${drawerWidth}px`,
    marginRight: rightOpen ? `${activityDrawerWidth}px` : 0,
    width: `calc(100% - ${leftOpen ? drawerWidth : 0}px - ${rightOpen ? activityDrawerWidth : 0}px)`,
  }),
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'leftOpen' && prop !== 'rightOpen',
})(({ theme, leftOpen, rightOpen }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(leftOpen && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px - ${rightOpen ? activityDrawerWidth : 0}px)`,
  }),
  ...(rightOpen && {
    marginRight: `${activityDrawerWidth}px`,
    width: `calc(100% - ${leftOpen ? drawerWidth : 0}px - ${activityDrawerWidth}px)`,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const ActivityListItem = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const SubListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Indent sub-items
}));

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [leftMobileOpen, setLeftMobileOpen] = useState(false);
  const [rightMobileOpen, setRightMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
    // { name: 'Students', href: '/dashboard/students', icon: <PeopleIcon /> },
    // { name: 'Classes', href: '/dashboard/classes', icon: <SchoolIcon /> },
    // { name: 'Attendance', href: '/dashboard/attendance', icon: <MenuBookIcon /> },
    // { name: 'Schedule', href: '/dashboard/schedule', icon: <CalendarIcon /> },
    // { name: 'Events', href: '/dashboard/events', icon: <EventIcon /> },
    { name: 'Fees', href: '/dashboard/fees', icon: <MoneyIcon /> },
    { name: 'Reports', href: '/dashboard/reports', icon: <ReportsIcon /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <SettingsIcon /> },
    // Library section
    { name: 'Library', href: '/library', icon: <LibraryBooksIcon /> },
    { name: 'Physical Books', href: '/library/physical-books', icon: <LibraryBooksIcon />, isSubItem: true },
    { name: 'Digital Resources', href: '/library/digital-resources', icon: <LibraryBooksIcon />, isSubItem: true },
    { name: 'Circulation', href: '/library/circulation', icon: <LibraryBooksIcon />, isSubItem: true },
  ];

  // Mock activity data for test environment
  const activities = [
    {
      id: 1,
      type: 'fee_payment',
      studentId: 'STU-1001',
      description: 'John Doe paid $250 for Tuition (2024-25 Term 1)',
      timestamp: new Date('2025-06-06T14:30:00Z'),
    },
    {
      id: 2,
      type: 'test',
      description: 'Mathematics Test for Grade 5 is ongoing',
      timestamp: new Date('2025-06-06T13:00:00Z'),
    },
    {
      id: 3,
      type: 'exam',
      description: 'Final Exams for Grade 8 started',
      timestamp: new Date('2025-06-06T09:00:00Z'),
    },
    {
      id: 4,
      type: 'event',
      description: 'Science Fair scheduled for 2025-04-15',
      timestamp: new Date('2025-06-05T10:00:00Z'),
    },
    {
      id: 5,
      type: 'attendance',
      studentId: 'STU-1002',
      description: 'Emma Smith marked present for Grade 7',
      timestamp: new Date('2025-06-06T08:00:00Z'),
    },
    {
      id: 6,
      type: 'fee_payment',
      studentId: 'STU-1004',
      description: 'Olivia Brown paid $200 for Boarding (2024-25 Term 2)',
      timestamp: new Date('2025-06-05T15:00:00Z'),
    },
  ];

  const handleLeftDrawerToggle = () => {
    setLeftMobileOpen(!leftMobileOpen);
  };

  const handleRightDrawerToggle = () => {
    setRightMobileOpen(!rightMobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const leftDrawer = (
    <div>
      <DrawerHeader>
        <Typography variant="h6" noWrap>
          Excel Schools
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            component={item.isSubItem ? SubListItem : ListItem}
          >
            <NavLink
              to={item.href}
              style={{ textDecoration: 'none', width: '100%' }}
              className={({ isActive }) => (isActive ? 'active-nav' : '')}
            >
              <ListItem button sx={{ py: 1.5 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );

  const rightDrawer = (
    <div>
      <DrawerHeader>
        <Typography variant="h6" noWrap>
          School Activities
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {activities.map((activity) => (
          <ActivityListItem key={activity.id}>
            <Typography variant="body2" color="text.primary">
              {activity.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </Typography>
          </ActivityListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" leftOpen={!isMobile || leftMobileOpen} rightOpen={!isMobile || rightMobileOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open navigation drawer"
            onClick={handleLeftDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open activity drawer"
            onClick={handleRightDrawerToggle}
            edge="end"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {currentUser?.name?.split(' ').map((n) => n[0]).join('') || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? leftMobileOpen : true}
        onClose={handleLeftDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        {leftDrawer}
      </Drawer>
      <Main leftOpen={!isMobile || leftMobileOpen} rightOpen={!isMobile || rightMobileOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="right"
        open={isMobile ? rightMobileOpen : true}
        onClose={handleRightDrawerToggle}
        sx={{
          width: activityDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: activityDrawerWidth,
            boxSizing: 'border-box',
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        {rightDrawer}
      </Drawer>
    </Box>
  );
};

export default DashboardLayout;