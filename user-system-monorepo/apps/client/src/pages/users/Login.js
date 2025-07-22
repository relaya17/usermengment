import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TextField, Button, Typography, Box, Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastRequest, setLastRequest] = useState(null);
    const [showDebug, setShowDebug] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLastRequest({ email, password });
        navigate("/");
    };
    return (_jsxs(Box, { maxWidth: 400, mx: "auto", mt: 5, component: "form", onSubmit: handleSubmit, display: "flex", flexDirection: "column", gap: 2, children: [_jsx(Typography, { variant: "h5", component: "h2", textAlign: "center", children: "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA" }), _jsx(TextField, { label: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, fullWidth: true, helperText: "\u05E9\u05D3\u05D4 \u05D7\u05D5\u05D1\u05D4" }), _jsx(TextField, { label: "\u05E1\u05D9\u05E1\u05DE\u05D4", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, fullWidth: true, helperText: "\u05E9\u05D3\u05D4 \u05D7\u05D5\u05D1\u05D4", InputProps: {
                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": showPassword ? "הסתר סיסמה" : "הצג סיסמה", onClick: () => setShowPassword((prev) => !prev), edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                } }), _jsxs(_Fragment, { children: [error && (_jsx(Alert, { severity: "error", children: error })), _jsx(Button, { variant: "text", color: "secondary", onClick: () => setShowDebug((prev) => !prev), sx: { mt: 1 }, children: showDebug ? "הסתר קוד שנשלח" : "הצג קוד שנשלח ושגיאה" }), showDebug && lastRequest && (_jsxs(Box, { mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2, fontFamily: "monospace", fontSize: 14, children: [_jsx(Typography, { variant: "subtitle2", children: "JSON \u05E9\u05E0\u05E9\u05DC\u05D7 \u05DC\u05E9\u05E8\u05EA:" }), _jsx("pre", { style: { direction: 'ltr', textAlign: 'left', margin: 0 }, children: JSON.stringify(lastRequest, null, 2) }), _jsx(Typography, { variant: "subtitle2", color: "error", mt: 1, children: "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05DE\u05D4\u05E9\u05E8\u05EA:" }), _jsx("pre", { style: { direction: 'ltr', textAlign: 'left', margin: 0 }, children: error })] }))] }), _jsx(Button, { variant: "contained", type: "submit", disabled: loading, fullWidth: true, size: "large", startIcon: loading ? _jsx(CircularProgress, { size: 20 }) : null, sx: { mt: 2 }, children: loading ? "טוען..." : "התחבר" })] }));
};
export default Login;
