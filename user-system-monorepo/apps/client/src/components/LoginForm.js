import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { loginUserThunk } from "../redux/thunks/authThunks";
import { TextField, Button, Typography, Box, Alert, CircularProgress, } from "@mui/material";
const Login = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserThunk({ email, password }));
    };
    return (_jsxs(Box, { maxWidth: 400, mx: "auto", mt: 5, component: "form", onSubmit: handleSubmit, display: "flex", flexDirection: "column", gap: 2, children: [_jsx(Typography, { variant: "h5", component: "h2", textAlign: "center", children: "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA" }), _jsx(TextField, { label: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, fullWidth: true }), _jsx(TextField, { label: "\u05E1\u05D9\u05E1\u05DE\u05D4", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, fullWidth: true }), error && _jsx(Alert, { severity: "error", children: error }), _jsx(Button, { variant: "contained", type: "submit", disabled: loading, fullWidth: true, size: "large", startIcon: loading ? _jsx(CircularProgress, { size: 20 }) : null, children: loading ? "טוען..." : "התחבר" })] }));
};
export default Login;
