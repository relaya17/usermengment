    // src/layouts/BusinessLayout.tsx
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
    // Update the import path below if your hooks file is in a different location, e.g. 'src/hooks' or 'src/app/hooks'
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
      BusinessCenter as BusinessIcon,
      AddCard as AddCardIcon,
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
    const TOTAL_BUSINESS_BOTTOM_SPACE_PX = CUSTOM_FOOTER_HEIGHT_PX + BOTTOM_NAV_HEIGHT_PX + 16; 

    // *** הגדרות ה-styled components חייבות להיות כאן, מחוץ לקומפוננטה BusinessLayout ***
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

    const BusinessLayout: React.FC = () => { 
      const navigate = useNavigate();
      const location = useLocation();
      const { isAuthenticated, user } = useAppSelector((state: { auth: any; }) => state.auth); 
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
        { label: 'ABOUT', to: '/business-portal/about', show: true },
        { label: 'FAV CARDS', to: '/business-portal/favorites', show: true },
        { label: 'MY CARDS', to: '/business-portal/my-cards', show: true },
      ];

      useEffect(() => {
        switch (location.pathname) {
          case '/business-portal/my-cards': 
            setBottomNavValue(0);
            break;
          case '/business-portal/create-card':
            setBottomNavValue(1);
            break;
          case '/business-portal/favorites':
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
          <AppBar position="sticky" color="secondary" sx={{ width: '100%' }}>
            <Toolbar>
              {/* Business Logo/Brand */}
              <Typography
                variant="h6"
                component={Link}
                to="/business-portal/my-cards" 
                sx={{ flexGrow: 0, textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit', mr: 1 }}
              >
                BCard
              </Typography>
              {/* Hamburger for mobile (xs only) */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, ml: 1 }}>
                <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
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
              {/* Desktop nav links (sm and up) */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, ml: 2 }}>
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

              {/* Search Bar */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="חיפוש בעסק..."
                  inputProps={{ 'aria-label': 'search-business' }}
                />
              </Search>

              {/* Toggle Light/Dark Mode */}
              <Tooltip title={mode === 'light' ? 'Turn on dark mode' : 'Turn on light mode'}>
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* Business User Profile / Auth Buttons */}
              {isAuthenticated ? (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
                  <IconButton color="inherit" component={Link} to="/business-portal/profile">
                    <img
                      src={user?.imagePath || 'https://placehold.co/40x40/4CAF50/FFFFFF?text=Biz'}
                      alt="Business Profile"
                      style={{
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                      }}
                    />
                  </IconButton>
                  <Button color="inherit" size="small" onClick={handleLogout} sx={{ fontSize: { xs: 12, sm: 13, md: 16 }, px: { xs: 1, sm: 1.5, md: 2 } }}>
                    התנתקות
                  </Button>
                </Box>
              ) : (
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

          {/* Main content area */}
          <Box 
            component="main" 
            sx={{ 
              pb: `${TOTAL_BUSINESS_BOTTOM_SPACE_PX}px`, 
              direction: 'rtl', 
              flexGrow: 1, 
              p: 2 
            }}
          >
            <Outlet /> 
            {/* 🆕 פוטר התוכן (BusinessFooter) ירונדר ע"י App.tsx, אין צורך כאן. */}
          </Box>

          {/* Business Bottom Navigation Bar */}
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
                    handleNavigation('/business-portal/my-cards'); 
                    break;
                  case 1:
                    handleNavigation('/business-portal/create-card'); 
                    break;
                  case 2:
                    handleNavigation('/business-portal/favorites'); 
                    break;
                  default:
                    break;
                }
              }}
            >
              <BottomNavigationAction label="My Cards" icon={<MyCardsIcon />} />
              <BottomNavigationAction label="Create Card" icon={<AddCardIcon />} /> 
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} /> 
            </BottomNavigation>
          </Box>
        </Box>
      );
    };

    export default BusinessLayout;
    