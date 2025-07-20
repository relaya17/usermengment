    // src/layouts/AdminLayout.tsx
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
      Tooltip,
    } from '@mui/material';
    import { alpha, styled, useTheme } from '@mui/material/styles';
    import { Theme } from '@mui/material/styles';
    import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'; 
    import { useAppSelector } from '../redux/hooks'; 
    import { useColorMode } from '../hooks/useColorMode';
    import { useDispatch } from 'react-redux';
    import { logout } from '../redux/slices/authSlice';

    // 🆕 אין צורך לייבא פוטרים כאן, כי הם מיובאים ב-App.tsx

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
      AdminPanelSettings as AdminIcon, 
      Dashboard as DashboardIcon, 
      Menu as MenuIcon,
    } from '@mui/icons-material';

    import Drawer from '@mui/material/Drawer';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemButton from '@mui/material/ListItemButton';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';

    // 🆕 גובה קבוע של הפוטרים וה-Bottom Navigation.
    const CUSTOM_FOOTER_HEIGHT_PX = 64; 
    const BOTTOM_NAV_HEIGHT_PX = 56; 
    const TOTAL_ADMIN_BOTTOM_SPACE_PX = CUSTOM_FOOTER_HEIGHT_PX + BOTTOM_NAV_HEIGHT_PX + 16; 

    // *** הגדרות ה-styled components חייבות להיות כאן, מחוץ לקומפוננטה AdminLayout ***
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
    // *** סוף הגדרות styled components ***

    const AdminLayout: React.FC = () => { 
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
        { label: 'אודות', to: '/admin-portal/about', show: true },
        { label: 'מועדפים', to: '/admin-portal/favorites', show: true },
        { label: 'הכרטיסים שלי', to: '/admin-portal/my-cards', show: true },
        { label: 'סנדבוקס', to: '/admin-portal/sandbox', show: true },
        { label: 'CRM', to: '/admin-portal/crm', show: true },
        { label: 'משתמשים', to: '/admin-portal/users', show: true },
      ];

      useEffect(() => {
        switch (location.pathname) {
          case '/admin-portal/dashboard': 
            setBottomNavValue(0);
            break;
          case '/admin-portal/crm':
            setBottomNavValue(1);
            break;
          case '/admin-portal/sandbox':
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
          <AppBar position="sticky" color="primary" sx={{ width: '100%' }}>
            <Toolbar>
              {/* Admin Logo/Brand */}
              <Typography
                variant="h6"
                component={Link}
                to="/admin-portal/dashboard" 
                sx={{ flexGrow: 1, textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
              >
                BCard - Admin
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
                  placeholder="חיפוש באדמין..."
                  inputProps={{ 'aria-label': 'search-admin' }}
                />
              </Search>

              {/* Toggle Light/Dark Mode */}
              <Tooltip title={mode === 'light' ? 'Turn on dark mode' : 'Turn on light mode'}>
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* Admin User Profile / Auth Buttons */}
              {isAuthenticated ? (
                <IconButton color="inherit" sx={{ ml: 2 }} component={Link} to="/admin-portal/profile">
                  <img
                    src="https://placehold.co/40x40/FF5722/FFFFFF?text=Admin"
                    alt="Admin Profile"
                    style={{
                      borderRadius: '8px',
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                    }}
                  />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
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

          {/* Main content area */}
          <Box 
            component="main" 
            sx={{ 
              pb: `${TOTAL_ADMIN_BOTTOM_SPACE_PX}px`, 
              direction: 'rtl', 
              flexGrow: 1, 
              p: 2 
            }}
          >
            <Outlet /> 
            {/* 🆕 פוטר התוכן (AdminFooter) ירונדר ע"י App.tsx, אין צורך כאן. */}
          </Box>

          {/* Admin Bottom Navigation Bar */}
          <Box sx={{ 
            width: '100%', 
            position: 'fixed', 
            bottom: 0, 
            right: 0, 
            left: 0, 
            zIndex: 1000, 
            direction: 'rtl' 
          }}>
            <BottomNavigation
              showLabels
              value={bottomNavValue}
              onChange={(event, newValue) => {
                setBottomNavValue(newValue);
                switch (newValue) {
                  case 0:
                    handleNavigation('/admin-portal/dashboard'); 
                    break;
                  case 1:
                    handleNavigation('/admin-portal/crm'); 
                    break;
                  case 2:
                    handleNavigation('/admin-portal/sandbox'); 
                    break;
                  default:
                    break;
                }
              }}
            >
              <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
              <BottomNavigationAction label="CRM" icon={<AdminIcon />} /> 
              <BottomNavigationAction label="Sandbox" icon={<MyCardsIcon />} /> 
            </BottomNavigation>
          </Box>
        </Box>
      );
    };

    export default AdminLayout;
    