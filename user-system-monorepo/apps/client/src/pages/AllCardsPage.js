import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/AllCardsPage.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, IconButton, CircularProgress, Alert, Snackbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, // Plus icon for FAB
 } from '@mui/icons-material';
// 🆕 נתונים מדומים של כרטיסים
const mockAllCards = [
    {
        _id: '101',
        title: 'כרטיס 1',
        subtitle: 'עסק לדוגמה',
        description: 'כרטיס עם תמונה card.png ורקע כחול בהיר.',
        phone: '050-1111111',
        email: 'biz1@example.com',
        web: 'http://biz1.com',
        imageUrl: '/images/card.png',
        imageAlt: 'כרטיס 1',
        address: { state: 'מרכז', country: 'ישראל', city: 'תל אביב', street: 'הרצל', houseNumber: '1', zip: '1234567' },
        cardNumber: '1000001',
        isFavorite: true,
        bgcolor: '#e3f2fd', // רקע כחול בהיר
    },
    {
        _id: '102',
        title: 'כרטיס 2',
        subtitle: 'עסק שני',
        description: 'כרטיס עם תמונה card4.png ורקע ירוק בהיר.',
        phone: '050-2222222',
        email: 'biz2@example.com',
        web: 'http://biz2.com',
        imageUrl: '/images/card4.png',
        imageAlt: 'כרטיס 2',
        address: { state: 'צפון', country: 'ישראל', city: 'חיפה', street: 'העצמאות', houseNumber: '5', zip: '7654321' },
        cardNumber: '1000002',
        isFavorite: false,
        bgcolor: '#e8f5e9', // רקע ירוק בהיר
    },
    {
        _id: '103',
        title: 'כרטיס 3',
        subtitle: 'עסק שלישי',
        description: 'כרטיס עם תמונה card.png וללא רקע מיוחד.',
        phone: '050-3333333',
        email: 'biz3@example.com',
        web: 'http://biz3.com',
        imageUrl: '/images/card.png',
        imageAlt: 'כרטיס 3',
        address: { state: 'דרום', country: 'ישראל', city: 'באר שבע', street: 'הנשיא', houseNumber: '10', zip: '9876543' },
        cardNumber: '1000003',
        isFavorite: true,
    },
];
// 🆕 הסרת הגדרות Theme ורכיבי styled עבור חיפוש - הם עברו ל-MainLayout
const AllCardsPage = () => {
    const [allCards, setAllCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // ניתן להעביר את זה ל-MainLayout אם החיפוש גלובלי
    const [snackbar, setSnackbar] = useState({
        open: false, message: "", severity: "success"
    });
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [cardToDelete, setCardToDelete] = useState(null);
    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };
    const fetchAllCards = async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAllCards(mockAllCards);
            setFilteredCards(mockAllCards);
            showSnackbar('כרטיסים נטענו בהצלחה!', 'success');
        }
        catch (e) {
            console.error("Error fetching all cards:", e);
            setError("שגיאה בטעינת כל הכרטיסים.");
            showSnackbar("שגיאה בטעינת כל הכרטיסים.", "error");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAllCards();
    }, []);
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCards(allCards);
        }
        else {
            setFilteredCards(allCards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.address.country.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm, allCards]);
    const toggleFavorite = async (cardId) => {
        const cardToToggle = allCards.find(card => card._id === cardId);
        if (!cardToToggle)
            return;
        const newFavoriteStatus = !cardToToggle.isFavorite;
        setAllCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card));
        setFilteredCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card));
        try {
            console.log(`Card ${cardId} favorite status toggled to ${newFavoriteStatus}`);
            showSnackbar(newFavoriteStatus ? 'הכרטיס נוסף למועדפים!' : 'הכרטיס הוסר מהמועדפים.', 'success');
        }
        catch (e) {
            console.error("Error toggling favorite status:", e);
            setAllCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card));
            setFilteredCards(prevCards => prevCards.map(card => card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card));
            showSnackbar(`שגיאה בשינוי מועדפים: ${e.message || 'שגיאה לא ידועה'}`, 'error');
        }
    };
    const handleEditCard = (cardId) => {
        console.log(`Edit card with ID: ${cardId}`);
        showSnackbar(`עריכת כרטיס ID: ${cardId}`, 'info');
        // 🆕 ניתן לנווט לדף העריכה: navigate(`/edit-card/${cardId}`);
    };
    const handleDeleteClick = (cardId) => {
        setCardToDelete(cardId);
        setOpenConfirmDialog(true);
    };
    const handleConfirmDelete = async () => {
        setOpenConfirmDialog(false);
        if (!cardToDelete)
            return;
        try {
            console.log(`Deleting card with ID: ${cardToDelete}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            setAllCards(prevCards => prevCards.filter(card => card._id !== cardToDelete));
            setFilteredCards(prevCards => prevCards.filter(card => card._id !== cardToDelete));
            showSnackbar(`כרטיס ${cardToDelete} נמחק בהצלחה!`, 'success');
        }
        catch (e) {
            console.error("Error deleting card:", e);
            showSnackbar(`שגיאה במחיקת הכרטיס: ${e.message || 'שגיאה לא ידועה'}`, 'error');
        }
        finally {
            setCardToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setOpenConfirmDialog(false);
        setCardToDelete(null);
    };
    const handleCreateNewCard = () => {
        console.log('Navigate to create new card page');
        showSnackbar('מעבר ליצירת כרטיס חדש', 'info');
        // 🆕 ניתן לנווט לדף היצירה: navigate('/create-card');
    };
    if (loading) {
        return (_jsxs(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }, children: [_jsx(CircularProgress, {}), _jsx(Typography, { variant: "h6", sx: { ml: 2, textAlign: 'center' }, children: "\u05D8\u05D5\u05E2\u05DF \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD..." })] }));
    }
    if (error) {
        return (_jsxs(Container, { maxWidth: "md", sx: { mt: 4, textAlign: 'center' }, children: [_jsx(Alert, { severity: "error", children: error }), _jsx(Button, { variant: "contained", onClick: fetchAllCards, sx: { mt: 2 }, children: "\u05E0\u05E1\u05D4 \u05DC\u05D8\u05E2\u05D5\u05DF \u05E9\u05D5\u05D1" })] }));
    }
    return (
    // 🆕 אין צורך ב-ThemeProvider כאן - הוא מגיע מ-App.tsx
    // 🆕 אין צורך ב-AppBar כאן - הוא מגיע מ-MainLayout.tsx
    _jsxs(Container, { component: "main", maxWidth: "lg", sx: { my: 4 }, children: [_jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: handleCloseSnackbar, anchorOrigin: { vertical: 'top', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleCloseSnackbar, severity: snackbar.severity, sx: { width: '100%', textAlign: 'right' }, children: snackbar.message }) }), _jsxs(Box, { sx: { p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Cards" }), _jsx(Typography, { variant: "subtitle1", gutterBottom: true, sx: { mb: 4 }, children: "Here you can find business cards from all categories" }), _jsx(Grid, { container: true, spacing: 3, children: filteredCards.length === 0 ? (_jsx(Grid, { item: true, xs: 12, children: _jsx(Alert, { severity: "info", sx: { textAlign: 'right' }, children: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05DB\u05E8\u05D8\u05D9\u05E1\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9." }) })) : (filteredCards.map((card) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Card, { sx: { display: 'flex', flexDirection: 'column', height: '100%', bgcolor: card.bgcolor || 'background.paper' }, children: [_jsx(CardMedia, { component: "img", image: card.imageUrl || 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image', alt: card.imageAlt || card.title, sx: { borderRadius: '12px 12px 0 0', objectFit: 'cover' }, onError: (e) => { e.currentTarget.src = 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image'; } }), _jsxs(CardContent, { sx: { flexGrow: 1, textAlign: 'right' }, children: [_jsx(Typography, { variant: "h5", component: "div", gutterBottom: true, children: card.title }), card.subtitle && (_jsx(Typography, { variant: "subtitle1", color: "text.secondary", sx: { mb: 1 }, children: card.subtitle })), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: card.description }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Phone:" }), " ", card.phone] }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Email:" }), " ", card.email] }), card.web && (_jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Web:" }), " ", _jsx("a", { href: card.web, target: "_blank", rel: "noopener noreferrer", children: card.web })] })), _jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Address:" }), " ", card.address.street, " ", card.address.houseNumber, ", ", card.address.city, ", ", card.address.country] }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: [_jsx("strong", { children: "Card Number:" }), " ", card.cardNumber || 'N/A'] })] }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }, children: _jsxs(Box, { children: [_jsx(IconButton, { "aria-label": "add to favorites", onClick: () => toggleFavorite(card._id), sx: { color: card.isFavorite ? 'red' : 'inherit' }, children: card.isFavorite ? _jsx(FavoriteIcon, {}) : _jsx(FavoriteBorderIcon, {}) }), _jsx(IconButton, { "aria-label": "edit card", onClick: () => handleEditCard(card._id), color: "info", children: _jsx(EditIcon, {}) }), _jsx(IconButton, { "aria-label": "delete card", onClick: () => handleDeleteClick(card._id), color: "error", children: _jsx(DeleteIcon, {}) })] }) })] })] }) }, card._id)))) })] }), _jsx(Fab, { color: "primary", "aria-label": "add", sx: { position: 'fixed', bottom: 16, right: 16 }, onClick: handleCreateNewCard, children: _jsx(AddIcon, {}) }), _jsxs(Dialog, { open: openConfirmDialog, onClose: handleCancelDelete, "aria-labelledby": "confirm-delete-dialog-title", "aria-describedby": "confirm-delete-dialog-description", children: [_jsx(DialogTitle, { id: "confirm-delete-dialog-title", children: "אישור מחיקת כרטיס" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "confirm-delete-dialog-description", children: "\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7 \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05DE\u05D7\u05D5\u05E7 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05D6\u05D4? \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05D4\u05D9\u05D0 \u05D1\u05DC\u05EA\u05D9 \u05D4\u05E4\u05D9\u05DB\u05D4." }) }), _jsxs(DialogActions, { sx: { justifyContent: 'flex-start' }, children: [_jsx(Button, { onClick: handleCancelDelete, variant: "outlined", children: "\u05D1\u05D9\u05D8\u05D5\u05DC" }), _jsx(Button, { onClick: handleConfirmDelete, variant: "contained", color: "error", autoFocus: true, children: "\u05DE\u05D7\u05E7" })] })] })] }));
};
export default AllCardsPage;
