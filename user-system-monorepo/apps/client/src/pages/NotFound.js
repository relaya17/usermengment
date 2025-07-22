import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
    return (_jsx(Container, { sx: { mt: 8, textAlign: 'center' }, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h2", color: "error", gutterBottom: true, children: "404 - \u05D4\u05D3\u05E3 \u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0" }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: "\u05D4\u05D3\u05E3 \u05E9\u05D7\u05D9\u05E4\u05E9\u05EA \u05DC\u05D0 \u05E7\u05D9\u05D9\u05DD \u05D0\u05D5 \u05D4\u05D5\u05E2\u05D1\u05E8 \u05DC\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D7\u05E8\u05EA." }), _jsx(Button, { variant: "contained", color: "primary", onClick: () => navigate('/'), sx: { mt: 3 }, children: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA" })] }) }));
};
export default NotFound;
