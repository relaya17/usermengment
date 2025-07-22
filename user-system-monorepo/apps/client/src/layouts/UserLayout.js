import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/layouts/UserLayout.tsx
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, IconButton, InputBase, BottomNavigation, BottomNavigationAction, Tooltip, // 🆕 הוסף Tooltip
 } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom'; // 🆕 ייבוא Outlet
import { useAppSelector } from '../redux/hooks';
import { useColorMode } from '../hooks/useColorMode';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
// 🆕 ייבוא אייקונים
import { Search as SearchIcon, Info as InfoIcon, Favorite as FavoriteIcon, CreditCard as MyCardsIcon, Login as LoginIcon, HowToReg as RegisterIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon, } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
// --- Styled components for Search ---
const Search = styled('div')(({ theme }) => ({
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
const SearchIconWrapper = styled('div')(({ theme }) => ({
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
const UserLayout = () => {
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
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (_jsxs(Box, { sx: { minHeight: '100vh', display: 'flex', flexDirection: 'column' }, children: [_jsx(AppBar, { position: "sticky", sx: { width: '100%' }, children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", component: Link, to: "/", sx: { flexGrow: 1, textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }, children: "BCard" }), _jsx(Box, { sx: { display: { xs: 'none', sm: 'flex' }, gap: 2 }, children: navLinks.filter(l => l.show).map(l => (_jsx(Button, { color: "inherit", component: Link, to: l.to, size: "small", sx: { fontSize: { xs: 12, sm: 13, md: 16 }, px: { xs: 1, sm: 1.5, md: 2 } }, children: l.label }, l.to))) }), _jsxs(Box, { sx: { display: { xs: 'flex', sm: 'none' } }, children: [_jsx(IconButton, { color: "inherit", onClick: () => setDrawerOpen(true), children: _jsx(MenuIcon, {}) }), _jsx(Drawer, { anchor: "right", open: drawerOpen, onClose: () => setDrawerOpen(false), children: _jsxs(Box, { sx: { width: 220 }, role: "presentation", onClick: () => setDrawerOpen(false), children: [_jsx(List, { children: navLinks.filter(l => l.show).map(l => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { component: Link, to: l.to, children: _jsx(ListItemText, { primary: l.label }) }) }, l.to))) }), _jsx(Divider, {}), isAuthenticated && (_jsx(List, { children: _jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: handleLogout, children: _jsx(ListItemText, { primary: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" }) }) }) }))] }) })] }), _jsxs(Search, { children: [_jsx(SearchIconWrapper, { children: _jsx(SearchIcon, {}) }), _jsx(StyledInputBase, { placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9...", inputProps: { 'aria-label': 'search' } })] }), _jsx(Tooltip, { title: mode === 'light' ? 'Turn on dark mode' : 'Turn on light mode', children: _jsx(IconButton, { sx: { ml: 1 }, onClick: toggleColorMode, color: "inherit", children: mode === 'dark' ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }) }), isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { color: "inherit", sx: { ml: 2 }, children: _jsx("img", { src: user?.imagePath || 'https://placehold.co/40x40/cccccc/ffffff?text=User', alt: "User Profile", style: {
                                            borderRadius: '8px',
                                            width: 40,
                                            height: 40,
                                            objectFit: 'cover',
                                        } }) }), _jsx(Button, { variant: "text", color: "inherit", size: "medium", onClick: handleLogout, sx: { ml: 1 }, children: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" })] })) : (
                        // Login/Register buttons
                        _jsxs(Box, { sx: { display: 'flex', gap: 0.5, mr: 2 }, children: [_jsx(Button, { variant: "contained", size: "small", component: Link, to: "/login", startIcon: _jsx(LoginIcon, {}), children: "LOGIN" }), _jsx(Button, { variant: "outlined", size: "small", component: Link, to: "/register", startIcon: _jsx(RegisterIcon, {}), children: "REGISTER" })] }))] }) }), _jsxs(Box, { component: "main", sx: { pb: 7, direction: 'rtl', flexGrow: 1, p: 2 }, children: [_jsx(Outlet, {}), " "] }), _jsx(Box, { sx: { width: '100%', position: 'fixed', bottom: 0, right: 0, left: 0, zIndex: 1000, direction: 'rtl' }, children: _jsxs(BottomNavigation, { showLabels: true, value: bottomNavValue, onChange: (event, newValue) => {
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
                    }, children: [_jsx(BottomNavigationAction, { label: "About", icon: _jsx(InfoIcon, {}) }), _jsx(BottomNavigationAction, { label: "Favorites", icon: _jsx(FavoriteIcon, {}) }), _jsx(BottomNavigationAction, { label: "My Cards", icon: _jsx(MyCardsIcon, {}) })] }) })] }));
};
export default UserLayout;
