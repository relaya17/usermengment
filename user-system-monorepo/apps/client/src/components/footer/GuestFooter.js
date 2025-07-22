import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // אייקון סימן קריאה
const GuestFooter = () => (_jsxs(Box, { component: "footer", sx: {
        mt: 'auto',
        py: 1,
        px: 2,
        bgcolor: 'background.default',
        color: 'text.secondary',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        height: '50px', // עדיף גובה קצת יותר גדול כדי שיתאים לאייקון
        display: 'flex',
        flexDirection: 'column', // כדי לסדר את האייקון מעל הטקסט
        alignItems: 'center',
        justifyContent: 'center',
        // רווח קטן בין האייקון לטקסט
    }, children: [_jsx(ErrorOutlineIcon, { sx: { color: 'text.primary', fontSize: 20 } }), _jsx(Typography, { variant: "body2", sx: { direction: 'rtl', display: 'inline-block' }, children: "\u05D0\u05D5\u05D3\u05D5\u05EA" })] }));
export default GuestFooter;
