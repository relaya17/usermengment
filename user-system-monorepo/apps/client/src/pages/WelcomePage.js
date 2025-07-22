import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (_jsx(Box, { sx: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            py: 8,
        }, children: _jsx(Container, { maxWidth: "md", children: _jsxs(Box, { textAlign: "center", sx: {
                    p: 4,
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    boxShadow: 3,
                }, children: [_jsx(Typography, { variant: "h2", component: "h1", gutterBottom: true, sx: { fontWeight: "bold" }, children: "\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC\u05BEBCard!" }), _jsx(Typography, { variant: "h6", color: "text.secondary", mb: 4, children: "\u05D4\u05E4\u05DC\u05D8\u05E4\u05D5\u05E8\u05DE\u05D4 \u05D4\u05D7\u05DB\u05DE\u05D4 \u05D1\u05D9\u05D5\u05EA\u05E8 \u05DC\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9 \u05D1\u05D9\u05E7\u05D5\u05E8 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD, \u05DE\u05D5\u05EA\u05D0\u05DE\u05EA \u05DC\u05E2\u05E1\u05E7\u05D9\u05DD \u05D5\u05DC\u05DC\u05E7\u05D5\u05D7\u05D5\u05EA." }), _jsxs(Box, { display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", children: [_jsx(Button, { variant: "contained", size: "large", color: "primary", onClick: () => navigate("/register"), children: "\u05D4\u05EA\u05D7\u05D9\u05DC\u05D5 \u05E2\u05DB\u05E9\u05D9\u05D5" }), _jsx(Button, { variant: "outlined", size: "large", color: "primary", onClick: () => navigate("/about"), children: "\u05DE\u05D9\u05D3\u05E2 \u05E0\u05D5\u05E1\u05E3" })] })] }) }) }));
};
export default WelcomePage;
