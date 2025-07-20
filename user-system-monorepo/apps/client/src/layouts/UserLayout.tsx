// src/layouts/UserLayout.tsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip, // 🆕 הוסף Tooltip
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'; // 🆕 ייבוא Outlet
import { useAppSelector } from '../redux/hooks';
import { useColorMode } from '../hooks/useColorMode';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

// 🆕 ייבוא אייקונים
import {
  Search as SearchIcon,
  Info as InfoIcon,
  Favorite as FavoriteIcon,
  CreditCard as MyCardsIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// --- Styled components for Search ---
const Search = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    marginLeft: theme.spacing(3),
  },
  direction: 'rtl',
}));

const SearchIconWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  left: 'auto',
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    textAlign: 'right',
    direction: 'rtl',
  },
}));

const UserLayout: React.FC = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { mode, toggleColorMode } = useColorMode(); 
  const theme = useTheme(); 
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const navLinks = [
    { label: 'אודות', to: '/about', show: true },
    { label: 'מועדפים', to: '/favorites', show: true },
    { label: 'הכרטיסים שלי', to: '/my-cards', show: isAuthenticated && (user?.role === 'business' || user?.role === 'admin') },
    { label: 'סנדבוקס', to: '/sandbox', show: isAuthenticated && user?.role === 'admin' },
    { label: 'CRM', to: '/crm', show: isAuthenticated && user?.role === 'admin' },
  ];

  const [bottomNavValue, setBottomNavValue] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/about':
        setBottomNavValue(0);
        break;
      case '/favorites':
        setBottomNavValue(1);
        break;
      case '/my-cards':
      case '/all-cards':
        setBottomNavValue(2);
        break;
      default:
        setBottomNavValue(-1);
        break;
    }
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" sx={{ width: '100%' }}>
        <Toolbar>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
          >
            BCard
          </Typography>

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navLinks.filter(l => l.show).map(l => (
              <Button
                key={l.to}
                color="inherit"
                component={Link}
                to={l.to}
                size="small"
                sx={{ fontSize: { xs: 12, sm: 13, md: 16 }, px: { xs: 1, sm: 1.5, md: 2 } }}
              >
                {l.label}
              </Button>
            ))}
          </Box>
          {/* Hamburger for mobile */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                <List>
                  {navLinks.filter(l => l.show).map(l => (
                    <ListItem key={l.to} disablePadding>
                      <ListItemButton component={Link} to={l.to}>
                        <ListItemText primary={l.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                {isAuthenticated && (
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="התנתקות" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )}
              </Box>
            </Drawer>
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="חיפוש..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Toggle Light/Dark Mode */}
          <Tooltip title={mode === 'light' ? 'Turn on dark mode' : 'Turn on light mode'}>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* User Profile / Auth Buttons */}
          {isAuthenticated ? (
            <>
              <IconButton color="inherit" sx={{ ml: 2 }}>
                <img
                  src={user?.imagePath || 'https://placehold.co/40x40/cccccc/ffffff?text=User'}
                  alt="User Profile"
                  style={{
                    borderRadius: '8px',
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                  }}
                />
              </IconButton>
              <Button
                variant="text"
                color="inherit"
                size="medium"
                onClick={handleLogout}
                sx={{ ml: 1 }}
              >
                התנתקות
              </Button>
            </>
          ) : (
            // Login/Register buttons
            <Box sx={{ display: 'flex', gap: 0.5, mr: 2 }}>
              <Button
                variant="contained"
                size="small"
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
              >
                LOGIN
              </Button>
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to="/register"
                startIcon={<RegisterIcon />}
              >
                REGISTER
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main content area - 🆕 AppRouter removed, Outlet added */}
      <Box component="main" sx={{ pb: 7, direction: 'rtl', flexGrow: 1, p: 2 }}>
        <Outlet /> {/* 🆕 Outlet ירנדר את תוכן המסלול המקונן */}
      </Box>

      {/* Bottom Navigation Bar (Fixed at the bottom) */}
      <Box sx={{ width: '100%', position: 'fixed', bottom: 0, right: 0, left: 0, zIndex: 1000, direction: 'rtl' }}>
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
            switch (newValue) {
              case 0:
                handleNavigation('/about');
                break;
              case 1:
                handleNavigation('/favorites');
                break;
              case 2:
                handleNavigation('/my-cards');
                break;
              default:
                break;
            }
          }}
        >
          <BottomNavigationAction label="About" icon={<InfoIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="My Cards" icon={<MyCardsIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default UserLayout; 
