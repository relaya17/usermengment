import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const BusinessFooter = () => {
    const theme = useTheme();
    return (_jsxs(Box, { component: "footer", sx: {
            mt: 'auto',
            py: 2,
            px: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'success.dark',
            color: 'white',
            borderTop: '1px solid',
            borderColor: 'success.light',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
        }, children: [_jsx(InfoIcon, { fontSize: "medium" }), _jsx(FavoriteIcon, { fontSize: "medium" }), _jsx(CreditCardIcon, { fontSize: "medium" })] }));
};
export default BusinessFooter;
