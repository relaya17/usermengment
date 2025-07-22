import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const AdminFooter = () => {
    const theme = useTheme();
    return (_jsxs(Box, { component: "footer", sx: {
            mt: 'auto',
            py: 2,
            px: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'primary.dark',
            color: 'white',
            borderTop: '1px solid',
            borderColor: 'primary.light',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
        }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(AdminPanelSettingsIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: "\u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E2\u05E8\u05DB\u05EA" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(FavoriteIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: "\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(InfoIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: "\u05D0\u05D5\u05D3\u05D5\u05EA" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(CreditCardIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: "\u05D4\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD \u05E9\u05DC\u05D9" })] })] }));
};
export default AdminFooter;
