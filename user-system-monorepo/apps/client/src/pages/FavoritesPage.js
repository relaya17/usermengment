import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/FavoriteCardsPage.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, IconButton, CircularProgress, Alert, Snackbar, Button, } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon // Heart icons
 } from '@mui/icons-material';
// 🆕 נתונים מדומים של כרטיסים
const mockCards = [
    {
        _id: '1',
        title: 'Second Card',
        description: 'This is the second card',
        phone: '050-0000000',
        email: 'test@example.com',
        web: 'https://www.example.com',
        imageUrl: 'https://placehold.co/600x400/99e699/000000?text=second+card+image',
        imageAlt: 'second card image',
        address: { state: 'Central', country: 'Israel', city: 'Tel Aviv', street: 'Dizengoff', houseNumber: '10', zip: '6433210' },
        cardNumber: '1029228',
        isFavorite: true,
    },
    {
        _id: '2',
        title: 'My Business Card',
        description: 'A professional service provider.',
        phone: '052-1234567',
        email: 'info@business.com',
        web: 'https://www.mybusiness.com',
        imageUrl: 'https://placehold.co/600x400/99b3e6/000000?text=business+card',
        imageAlt: 'business card image',
        address: { state: 'North', country: 'Israel', city: 'Haifa', street: 'Hapalmach', houseNumber: '5', zip: '3333333' },
        cardNumber: '5551234',
        isFavorite: false,
    },
    {
        _id: '3',
        title: 'Tech Solutions',
        description: 'Innovative IT services.',
        phone: '054-9876543',
        email: 'contact@tech.com',
        imageUrl: 'https://placehold.co/600x400/e6b399/000000?text=tech+solutions',
        imageAlt: 'tech solutions image',
        address: { state: 'South', country: 'Israel', city: 'Beer Sheva', street: 'Rambam', houseNumber: '22', zip: '8488888' },
        cardNumber: '7890123',
        isFavorite: true,
    },
];
// 🆕 הסרת הגדרות Theme מכאן
const FavoritsPage = () => {
    const [favoriteCards, setFavoriteCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false, message: "", severity: "success"
    });
    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };
    const fetchFavoriteCards = async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const initialFavorites = mockCards.filter(card => card.isFavorite);
            setFavoriteCards(initialFavorites);
            showSnackbar('כרטיסים מועדפים נטענו בהצלחה!', 'success');
        }
        catch (e) {
            console.error("Error fetching favorite cards:", e);
            setError("שגיאה בטעינת כרטיסים מועדפים.");
            showSnackbar("שגיאה בטעינת כרטיסים מועדפים.", "error");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFavoriteCards();
    }, []);
    const toggleFavorite = async (cardId) => {
        const cardToToggle = favoriteCards.find(card => card._id === cardId);
        if (!cardToToggle)
            return;
        const newFavoriteStatus = !cardToToggle.isFavorite;
        setFavoriteCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card).filter(card => card.isFavorite));
        try {
            console.log(`Card ${cardId} favorite status toggled to ${newFavoriteStatus}`);
            showSnackbar(newFavoriteStatus ? 'הכרטיס נוסף למועדפים!' : 'הכרטיס הוסר מהמועדפים.', 'success');
        }
        catch (e) {
            console.error("Error toggling favorite status:", e);
            setFavoriteCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card).filter(card => card.isFavorite));
            showSnackbar(`שגיאה בשינוי מועדפים: ${e.message || 'שגיאה לא ידועה'}`, 'error');
        }
    };
    if (loading) {
        return (_jsxs(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }, children: [_jsx(CircularProgress, {}), _jsx(Typography, { variant: "h6", sx: { ml: 2, textAlign: 'center' }, children: "\u05D8\u05D5\u05E2\u05DF \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD \u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD..." })] }));
    }
    if (error) {
        return (_jsxs(Container, { maxWidth: "md", sx: { mt: 4, textAlign: 'center' }, children: [_jsx(Alert, { severity: "error", children: error }), _jsx(Button, { variant: "contained", onClick: fetchFavoriteCards, sx: { mt: 2 }, children: "\u05E0\u05E1\u05D4 \u05DC\u05D8\u05E2\u05D5\u05DF \u05E9\u05D5\u05D1" })] }));
    }
    return (
    // 🆕 אין צורך ב-ThemeProvider כאן - הוא מגיע מ-App.tsx
    _jsxs(Container, { component: "main", maxWidth: "lg", sx: { my: 4 }, children: [_jsxs(Box, { sx: { p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Favorite Cards Page" }), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, sx: { mb: 4 }, children: "Here you can find all your favorite business cards" }), _jsx(Grid, { container: true, spacing: 3, children: favoriteCards.length === 0 ? (_jsx(Grid, { item: true, xs: 12, children: _jsx(Alert, { severity: "info", sx: { textAlign: 'right' }, children: "\u05D0\u05D9\u05DF \u05DC\u05DA \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD \u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD \u05DB\u05E8\u05D2\u05E2." }) })) : (favoriteCards.map((card) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Card, { sx: { display: 'flex', flexDirection: 'column', height: '100%' }, children: [_jsx(CardMedia, { component: "img", image: card.imageUrl, alt: card.imageAlt || card.title, sx: { borderRadius: '12px 12px 0 0', objectFit: 'cover' }, onError: (e) => { e.currentTarget.src = 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image'; } }), _jsxs(CardContent, { sx: { flexGrow: 1, textAlign: 'right' }, children: [_jsx(Typography, { variant: "h5", component: "div", gutterBottom: true, children: card.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: card.description }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Phone:" }), " ", card.phone] }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Card Number:" }), " ", card.cardNumber || 'N/A'] })] }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 2 }, children: _jsx(IconButton, { "aria-label": "add to favorites", onClick: () => toggleFavorite(card._id), sx: { color: card.isFavorite ? 'red' : 'inherit' }, children: card.isFavorite ? _jsx(FavoriteIcon, {}) : _jsx(FavoriteBorderIcon, {}) }) })] })] }) }, card._id)))) })] }), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: handleCloseSnackbar, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleCloseSnackbar, severity: snackbar.severity, sx: { width: '100%', textAlign: 'right' }, children: snackbar.message }) })] }));
};
export default FavoritsPage;
