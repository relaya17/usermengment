import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useColorMode } from '../hooks/useColorMode';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

// פוטרים
import AdminFooter from '../components/footer/AdminFooter';
import BusinessFooter from '../components/footer/BusinessFooter';
import GuestFooter from '../components/footer/GuestFooter';
import UserFooter from '../components/footer/UserFooter';

import {
  Search as SearchIcon,
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginInline: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  direction: 'rtl',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { mode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const navLinks = [
    { label: 'אודות', to: '/about', show: true },
    { label: 'הכרטיסים שלי', to: '/my-cards', show: isAuthenticated && (user?.role === 'business' || user?.role === 'admin') },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case '/about':
        setBottomNavValue(0);
        break;
      default:
        setBottomNavValue(-1);
        break;
    }
  }, [location.pathname]);

  let FooterComponent = GuestFooter;
  if (isAuthenticated && user) {
    switch (user.role) {
      case 'admin':
        FooterComponent = AdminFooter;
        break;
      case 'business':
        FooterComponent = BusinessFooter;
        break;
      case 'user':
        FooterComponent = UserFooter;
        break;
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" sx={{ width: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            MyDigitalCard
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="חיפוש..." inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Tooltip title={mode === 'light' ? 'מצב כהה' : 'מצב בהיר'}>
              <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            {!isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 0.5, mr: 1 }}>
                <Button
                  variant="text"
                  color="inherit"
                  size="medium"
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon />}
                >
                  התחברות
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="medium"
                  component={Link}
                  to="/register"
                  startIcon={<RegisterIcon />}
                >
                  הרשמה
                </Button>
              </Box>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/profile">
                  <img
                    src={user?.imagePath || 'https://placehold.co/40x40/cccccc/ffffff?text=User'}
                    alt="User"
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
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 2, direction: 'rtl' }}>
        <Outlet />
      </Box>

    </Box>
  );
};

export default MainLayout;
