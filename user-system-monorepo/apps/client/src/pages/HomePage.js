import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Box, Typography, IconButton, Card, CardContent, CardMedia, Grid, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from '@mui/icons-material/Phone';
import { useTheme } from "@mui/material/styles";
const HomePage = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const theme = useTheme();
    // Redirect business user to business-portal
    useEffect(() => {
        if (user?.role === 'business') {
            navigate('/business-portal/my-cards', { replace: true });
        }
    }, [user, navigate]);
    useEffect(() => {
        // נתוני כרטיסי עסקים מלאים בעברית, כולל פרטי קשר
        setCards([
            {
                id: "123",
                name: "מסעדת שף",
                description: "מטבח עילי באווירה אינטימית",
                image: "/images/card.png",
                isFavorite: false,
                phone: "050-1234567",
                address: "רחוב השף 10, תל אביב",
                cardNumber: "1234567",
            },
            {
                id: "456",
                name: "ספריית ילדים",
                description: "מבחר ספרים לכל גיל",
                image: "/images/card2.png",
                isFavorite: false,
                phone: "050-2345678",
                address: "שדרות הספר 5, ירושלים",
                cardNumber: "2345678",
            },
            {
                id: "789",
                name: "מכון כושר",
                description: "אימונים קבוצתיים וייעוץ תזונתי",
                image: "/images/card4.png",
                isFavorite: false,
                phone: "050-3456789",
                address: "דרך הכושר 20, חיפה",
                cardNumber: "3456789",
            },
        ]);
    }, []);
    const canEdit = user?.role === "business" || user?.role === "admin";
    const displayCards = cards;
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4, direction: 'rtl' }, children: [_jsxs("section", { style: { textAlign: 'center', marginBottom: theme.spacing(4) }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: { fontSize: { xs: 24, sm: 32, md: 36 } }, children: "\u05D1\u05E8\u05D5\u05DB\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD \u05DC\u05D0\u05E4\u05DC\u05D9\u05E7\u05E6\u05D9\u05D9\u05EA \u05E0\u05D9\u05D4\u05D5\u05DC \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD" }), _jsx(Typography, { variant: "h6", color: "text.secondary", gutterBottom: true, sx: { fontSize: { xs: 16, sm: 20 } }, children: "\u05D9\u05E6\u05D9\u05E8\u05D4, \u05E0\u05D9\u05D4\u05D5\u05DC \u05D5\u05E9\u05D9\u05EA\u05D5\u05E3 \u05E9\u05DC \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9 \u05D1\u05D9\u05E7\u05D5\u05E8 \u05D3\u05D9\u05D2\u05D9\u05D8\u05DC\u05D9\u05D9\u05DD" })] }), _jsx(Grid, { container: true, spacing: 3, justifyContent: "center", children: displayCards.length > 0 ? (displayCards.map((card) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, sx: { display: 'flex', width: '100%' }, children: _jsxs(Card, { sx: {
                            width: '100%',
                            maxWidth: 350,
                            mx: 'auto',
                            height: '100%',
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-5px)' },
                            direction: 'rtl',
                            background: '#fff',
                            p: 0,
                        }, children: [_jsx(Box, { sx: { width: '100%', height: 220 }, children: _jsx(CardMedia, { component: "img", image: card.image, alt: card.name, sx: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px 8px 0 0',
                                        ...(card.name === 'מכון כושר' ? { objectPosition: 'center top' } : {})
                                    } }) }), _jsxs(CardContent, { sx: { flexGrow: 1, p: 2, background: '#fff' }, children: [_jsx(Typography, { variant: "h6", sx: { mt: 0, fontWeight: 'bold', textAlign: 'right' }, children: card.name }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { minHeight: 40, textAlign: 'right' }, children: card.description }), _jsxs(Box, { sx: { mt: 2, textAlign: 'left', direction: 'ltr' }, children: [_jsxs(Typography, { variant: "body2", color: "text.primary", children: ["\u05D8\u05DC\u05E4\u05D5\u05DF: ", card.phone] }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: ["\u05DB\u05EA\u05D5\u05D1\u05EA: ", card.address] }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: ["\u05DE\u05E1\u05E4\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1: ", card.cardNumber] })] })] }), _jsxs(Box, { sx: {
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    gap: 1,
                                    py: 1,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    mt: 'auto',
                                    px: 2,
                                }, children: [canEdit && (_jsxs(_Fragment, { children: [_jsx(IconButton, { onClick: () => navigate(`/edit/${card.id}`), "aria-label": "\u05E2\u05E8\u05D5\u05DA", color: "info", children: _jsx(EditIcon, {}) }), _jsx(IconButton, { onClick: () => {
                                                    alert(`Delete card: ${card.name}`);
                                                }, "aria-label": "\u05DE\u05D7\u05E7", color: "error", children: _jsx(DeleteIcon, {}) })] })), _jsx(IconButton, { onClick: () => {
                                            alert(`Calling: ${card.phone}`);
                                        }, "aria-label": "\u05D4\u05EA\u05E7\u05E9\u05E8", color: "primary", children: _jsx(PhoneIcon, {}) })] })] }) }, card.id)))) : (_jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "h6", color: "text.secondary", sx: { textAlign: 'center', width: '100%' }, children: "\u05D0\u05D9\u05DF \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD \u05DB\u05E8\u05D2\u05E2." }) })) })] }));
};
export default HomePage;
