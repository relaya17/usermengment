import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box, } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { useColorMode } from "../../hooks/useColorMode";
const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const { toggleColorMode, mode } = useColorMode();
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        navigate("/");
    };
    return (_jsx(AppBar, { position: "static", dir: "rtl", children: _jsxs(Toolbar, { sx: { display: "flex", justifyContent: "space-between" }, children: [_jsx(Box, { children: _jsx(IconButton, { onClick: toggleColorMode, color: "inherit", "aria-label": "\u05D4\u05D7\u05DC\u05E3 \u05DE\u05E6\u05D1 \u05EA\u05D0\u05D5\u05E8\u05D4", children: mode === "dark" ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }) }), _jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1, textAlign: "center" }, children: "\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D9\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD" }), _jsx(Box, { children: user ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { onClick: handleMenu, color: "inherit", children: _jsx(AccountCircle, {}) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose, children: [_jsx(MenuItem, { onClick: () => { navigate("/profile"); handleClose(); }, children: "\u05D4\u05E4\u05E8\u05D5\u05E4\u05D9\u05DC \u05E9\u05DC\u05D9" }), user.role === "admin" && (_jsx(MenuItem, { onClick: () => { navigate("/dashboard"); handleClose(); }, children: "\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E2\u05E8\u05DB\u05EA" })), _jsx(MenuItem, { onClick: handleLogout, children: "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { color: "inherit", onClick: () => navigate("/login"), children: "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA" }), _jsx(Button, { color: "inherit", onClick: () => navigate("/register"), children: "\u05D4\u05E8\u05E9\u05DE\u05D4" })] })) })] }) }));
};
export default Navbar;
