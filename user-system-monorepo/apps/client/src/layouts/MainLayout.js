import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, IconButton, InputBase, Tooltip, } from '@mui/material';
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
import { Search as SearchIcon, Login as LoginIcon, HowToReg as RegisterIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon, } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
const MainLayout = () => {
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
    // קביעת לוגו וכותרת לפי סוג המשתמש
    let logoText = 'BCard';
    let appBarColor = 'primary.main';
    let navLinks = [
        { label: 'ABOUT', to: '/about', show: true },
        { label: 'FAV CARDS', to: '/favorites', show: isAuthenticated },
        { label: 'MY CARDS', to: '/my-cards', show: isAuthenticated },
    ];
    if (isAuthenticated && user) {
        if (user.role === 'business') {
            logoText = 'BusinessPro';
            appBarColor = '#222';
            navLinks.push({ label: 'ניהול לקוחות', to: '/crm', show: true });
        }
        if (user.role === 'admin') {
            logoText = 'AdminPanel';
            appBarColor = '#4B0082'; // צבע ייחודי לאדמין
            navLinks.push({ label: 'SANDBOX', to: '/sandbox', show: true });
        }
    }
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
    return (_jsxs(Box, { sx: { minHeight: '100vh', display: 'flex', flexDirection: 'column' }, children: [_jsx(AppBar, { position: "sticky", sx: { width: '100%', bgcolor: appBarColor }, children: _jsxs(Toolbar, { sx: { display: 'flex', justifyContent: 'space-between', width: '100%' }, children: [_jsx(Typography, { variant: "h6", component: Link, to: "/", sx: { textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }, children: logoText }), _jsx(Box, { sx: { display: { xs: 'none', sm: 'flex' }, gap: 2 }, children: navLinks.filter(l => l.show).map(l => (_jsx(Button, { color: "inherit", component: Link, to: l.to, size: "small", sx: { fontSize: { xs: 12, sm: 13, md: 16 }, px: { xs: 1, sm: 1.5, md: 2 } }, children: l.label }, l.to))) }), _jsxs(Box, { sx: { display: { xs: 'flex', sm: 'none' } }, children: [_jsx(IconButton, { color: "inherit", onClick: () => setDrawerOpen(true), children: _jsx(MenuIcon, {}) }), _jsx(Drawer, { anchor: "right", open: drawerOpen, onClose: () => setDrawerOpen(false), children: _jsxs(Box, { sx: { width: 220 }, role: "presentation", onClick: () => setDrawerOpen(false), children: [_jsx(List, { children: navLinks.filter(l => l.show).map(l => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { component: Link, to: l.to, children: _jsx(ListItemText, { primary: l.label }) }) }, l.to))) }), _jsx(Divider, {}), isAuthenticated && (_jsx(List, { children: _jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: handleLogout, children: _jsx(ListItemText, { primary: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" }) }) }) }))] }) })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center' }, children: [_jsxs(Search, { children: [_jsx(SearchIconWrapper, { children: _jsx(SearchIcon, {}) }), _jsx(StyledInputBase, { placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9...", inputProps: { 'aria-label': 'search' } })] }), _jsx(Tooltip, { title: mode === 'light' ? 'מצב כהה' : 'מצב בהיר', children: _jsx(IconButton, { sx: { mr: 1 }, onClick: toggleColorMode, color: "inherit", children: mode === 'dark' ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }) }), !isAuthenticated ? (_jsxs(Box, { sx: { display: 'flex', gap: 0.5, mr: 1 }, children: [_jsx(Button, { variant: "text", color: "inherit", size: "medium", component: Link, to: "/login", startIcon: _jsx(LoginIcon, {}), children: "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA" }), _jsx(Button, { variant: "text", color: "inherit", size: "medium", component: Link, to: "/register", startIcon: _jsx(RegisterIcon, {}), children: "\u05D4\u05E8\u05E9\u05DE\u05D4" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconButton, { color: "inherit", component: Link, to: "/profile", children: _jsx(AccountCircleIcon, { fontSize: "large" }) }), _jsx(Button, { variant: "text", color: "inherit", size: "medium", onClick: handleLogout, sx: { ml: 1 }, children: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" })] }))] })] }) }), _jsx(Box, { component: "main", sx: { flexGrow: 1, p: 2, direction: 'rtl' }, children: _jsx(Outlet, {}) })] }));
};
export default MainLayout;
