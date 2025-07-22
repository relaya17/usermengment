import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // אייקון סימן קריאה
const UserFooter = () => {
    const theme = useTheme();
    return (_jsxs(Box, { component: "footer", sx: {
            mt: 'auto',
            py: 2,
            px: 2,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            borderTop: '1px solid',
            borderColor: 'divider',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
        }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(ErrorOutlineIcon, { fontSize: "small", sx: { color: 'primary.main' } }), _jsx(Typography, { variant: "body2", children: "\u05D0\u05D5\u05D3\u05D5\u05EA" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(FavoriteIcon, { fontSize: "small", color: "error" }), _jsx(Typography, { variant: "body2", children: "\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD" })] })] }));
};
export default UserFooter;
