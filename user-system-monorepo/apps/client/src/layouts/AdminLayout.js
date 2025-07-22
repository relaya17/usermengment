import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/layouts/AdminLayout.tsx
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, IconButton, InputBase, BottomNavigation, BottomNavigationAction, Tooltip, } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { useColorMode } from '../hooks/useColorMode';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
// 🆕 אין צורך לייבא פוטרים כאן, כי הם מיובאים ב-App.tsx
import { Search as SearchIcon, CreditCard as MyCardsIcon, Login as LoginIcon, HowToReg as RegisterIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, AdminPanelSettings as AdminIcon, Dashboard as DashboardIcon, Menu as MenuIcon, } from '@mui/icons-material';
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
// *** סוף הגדרות styled components ***
const AdminLayout = () => {
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
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (_jsxs(Box, { sx: { minHeight: '100vh', display: 'flex', flexDirection: 'column' }, children: [_jsx(AppBar, { position: "sticky", color: "primary", sx: { width: '100%' }, children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", component: Link, to: "/admin-portal/dashboard", sx: { flexGrow: 1, textAlign: 'left', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }, children: "BCard - Admin" }), _jsx(Box, { sx: { display: { xs: 'none', sm: 'flex' }, gap: 2 }, children: navLinks.filter(l => l.show).map(l => (_jsx(Button, { color: "inherit", component: Link, to: l.to, size: "small", sx: { fontSize: { xs: 12, sm: 13, md: 16 }, px: { xs: 1, sm: 1.5, md: 2 } }, children: l.label }, l.to))) }), _jsxs(Box, { sx: { display: { xs: 'flex', sm: 'none' } }, children: [_jsx(IconButton, { color: "inherit", onClick: () => setDrawerOpen(true), children: _jsx(MenuIcon, {}) }), _jsx(Drawer, { anchor: "right", open: drawerOpen, onClose: () => setDrawerOpen(false), children: _jsxs(Box, { sx: { width: 220 }, role: "presentation", onClick: () => setDrawerOpen(false), children: [_jsx(List, { children: navLinks.filter(l => l.show).map(l => (_jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { component: Link, to: l.to, children: _jsx(ListItemText, { primary: l.label }) }) }, l.to))) }), _jsx(Divider, {}), isAuthenticated && (_jsx(List, { children: _jsx(ListItem, { disablePadding: true, children: _jsx(ListItemButton, { onClick: handleLogout, children: _jsx(ListItemText, { primary: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" }) }) }) }))] }) })] }), _jsxs(Search, { children: [_jsx(SearchIconWrapper, { children: _jsx(SearchIcon, {}) }), _jsx(StyledInputBase, { placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D0\u05D3\u05DE\u05D9\u05DF...", inputProps: { 'aria-label': 'search-admin' } })] }), _jsx(Tooltip, { title: mode === 'light' ? 'Turn on dark mode' : 'Turn on light mode', children: _jsx(IconButton, { sx: { ml: 1 }, onClick: toggleColorMode, color: "inherit", children: mode === 'dark' ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }) }), isAuthenticated ? (_jsx(IconButton, { color: "inherit", sx: { ml: 2 }, component: Link, to: "/admin-portal/profile", children: _jsx("img", { src: "https://placehold.co/40x40/FF5722/FFFFFF?text=Admin", alt: "Admin Profile", style: {
                                    borderRadius: '8px',
                                    width: 40,
                                    height: 40,
                                    objectFit: "cover",
                                } }) })) : (_jsxs(Box, { sx: { display: 'flex', gap: 1, mr: 2 }, children: [_jsx(Button, { variant: "contained", size: "small", component: Link, to: "/login", startIcon: _jsx(LoginIcon, {}), children: "LOGIN" }), _jsx(Button, { variant: "outlined", size: "small", component: Link, to: "/register", startIcon: _jsx(RegisterIcon, {}), children: "REGISTER" })] }))] }) }), _jsx(Box, { component: "main", sx: {
                    pb: `${TOTAL_ADMIN_BOTTOM_SPACE_PX}px`,
                    direction: 'rtl',
                    flexGrow: 1,
                    p: 2
                }, children: _jsx(Outlet, {}) }), _jsx(Box, { sx: {
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    direction: 'rtl'
                }, children: _jsxs(BottomNavigation, { showLabels: true, value: bottomNavValue, onChange: (event, newValue) => {
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
                    }, children: [_jsx(BottomNavigationAction, { label: "Dashboard", icon: _jsx(DashboardIcon, {}) }), _jsx(BottomNavigationAction, { label: "CRM", icon: _jsx(AdminIcon, {}) }), _jsx(BottomNavigationAction, { label: "Sandbox", icon: _jsx(MyCardsIcon, {}) })] }) })] }));
};
export default AdminLayout;
