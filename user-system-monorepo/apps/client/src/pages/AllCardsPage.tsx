// src/pages/AllCardsPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon, // Plus icon for FAB
} from '@mui/icons-material';
// 🆕 הסרת createTheme ו-ThemeProvider, ו-styled מכאן - הם מגיעים מה-Global Theme ו-MainLayout
// import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
// import { styled } from '@mui/system';
import { AlertColor } from '@mui/material/Alert';

// 🆕 ממשק עבור נתוני כרטיס ביקור (מותאם לתמונה)
interface IBusinessCard {
  _id: string; // ID ייחודי לכרטיס
  title: string;
  subtitle?: string; // נוסף לפי טופס יצירה/עריכה
  description: string;
  phone: string;
  email: string;
  web?: string;
  imageUrl?: string; // Optional (or provide a default placeholder)
  imageAlt?: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  cardNumber?: string;
  isFavorite: boolean;
  bgcolor?: string; // רקע מיוחד לכרטיס
}

// 🆕 נתונים מדומים של כרטיסים
const mockAllCards: IBusinessCard[] = [
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
  const [allCards, setAllCards] = useState<IBusinessCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<IBusinessCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // ניתן להעביר את זה ל-MainLayout אם החיפוש גלובלי
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false, message: "", severity: "success"
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
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
    } catch (e: any) {
      console.error("Error fetching all cards:", e);
      setError("שגיאה בטעינת כל הכרטיסים.");
      showSnackbar("שגיאה בטעינת כל הכרטיסים.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCards(allCards);
    } else {
      setFilteredCards(
        allCards.filter(card =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.address.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allCards]);

  const toggleFavorite = async (cardId: string) => {
    const cardToToggle = allCards.find(card => card._id === cardId);
    if (!cardToToggle) return;

    const newFavoriteStatus = !cardToToggle.isFavorite;

    setAllCards(prevCards =>
      prevCards.map(card =>
        card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card
      )
    );
    setFilteredCards(prevCards =>
      prevCards.map(card =>
        card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card
      )
    );

    try {
      console.log(`Card ${cardId} favorite status toggled to ${newFavoriteStatus}`);
      showSnackbar(
        newFavoriteStatus ? 'הכרטיס נוסף למועדפים!' : 'הכרטיס הוסר מהמועדפים.',
        'success'
      );
    } catch (e: any) {
      console.error("Error toggling favorite status:", e);
      setAllCards(prevCards =>
        prevCards.map(card =>
          card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card
        )
      );
      setFilteredCards(prevCards =>
        prevCards.map(card =>
          card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card
        )
      );
      showSnackbar(`שגיאה בשינוי מועדפים: ${e.message || 'שגיאה לא ידועה'}`, 'error');
    }
  };

  const handleEditCard = (cardId: string) => {
    console.log(`Edit card with ID: ${cardId}`);
    showSnackbar(`עריכת כרטיס ID: ${cardId}`, 'info');
    // 🆕 ניתן לנווט לדף העריכה: navigate(`/edit-card/${cardId}`);
  };

  const handleDeleteClick = (cardId: string) => {
    setCardToDelete(cardId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    if (!cardToDelete) return;

    try {
      console.log(`Deleting card with ID: ${cardToDelete}`);
      await new Promise(resolve => setTimeout(resolve, 500));

      setAllCards(prevCards => prevCards.filter(card => card._id !== cardToDelete));
      setFilteredCards(prevCards => prevCards.filter(card => card._id !== cardToDelete));
      showSnackbar(`כרטיס ${cardToDelete} נמחק בהצלחה!`, 'success');
    } catch (e: any) {
      console.error("Error deleting card:", e);
      showSnackbar(`שגיאה במחיקת הכרטיס: ${e.message || 'שגיאה לא ידועה'}`, 'error');
    } finally {
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, textAlign: 'center' }}>טוען כרטיסים...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={fetchAllCards} sx={{ mt: 2 }}>נסה לטעון שוב</Button>
      </Container>
    );
  }

  return (
    // 🆕 אין צורך ב-ThemeProvider כאן - הוא מגיע מ-App.tsx
    // 🆕 אין צורך ב-AppBar כאן - הוא מגיע מ-MainLayout.tsx
    <Container component="main" maxWidth="lg" sx={{ my: 4 }}>
      {/* 🆕 Snackbar - נשאר כאן, אך וודא שה-anchorOrigin תואם את ה-theme הגלובלי או שאתה רוצה אותו כאן ספציפית */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', textAlign: 'right' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cards
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
          Here you can find business cards from all categories
        </Typography>

        <Grid container spacing={3}>
          {filteredCards.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ textAlign: 'right' }}>
                לא נמצאו כרטיסים תואמים לחיפוש.
              </Alert>
            </Grid>
          ) : (
            filteredCards.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: card.bgcolor || 'background.paper' }}>
                  <CardMedia
                    component="img"
                    image={card.imageUrl || 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image'}
                    alt={card.imageAlt || card.title}
                    sx={{ borderRadius: '12px 12px 0 0', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image'; }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {card.title}
                    </Typography>
                    {card.subtitle && (
                      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                        {card.subtitle}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {card.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.primary">
                        <strong>Phone:</strong> {card.phone}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Email:</strong> {card.email}
                      </Typography>
                      {card.web && (
                        <Typography variant="body2" color="text.primary">
                          <strong>Web:</strong> <a href={card.web} target="_blank" rel="noopener noreferrer">{card.web}</a>
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.primary">
                        <strong>Address:</strong> {card.address.street} {card.address.houseNumber}, {card.address.city}, {card.address.country}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Card Number:</strong> {card.cardNumber || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      {/* Action Icons: Heart, Edit, Delete */}
                      <Box>
                        <IconButton
                          aria-label="add to favorites"
                          onClick={() => toggleFavorite(card._id)}
                          sx={{ color: card.isFavorite ? 'red' : 'inherit' }}
                        >
                          {card.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <IconButton
                          aria-label="edit card"
                          onClick={() => handleEditCard(card._id)}
                          color="info"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete card"
                          onClick={() => handleDeleteClick(card._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Floating Action Button for creating new card */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleCreateNewCard}
      >
        <AddIcon />
      </Fab>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">{"אישור מחיקת כרטיס"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            האם אתה בטוח שברצונך למחוק כרטיס זה? פעולה זו היא בלתי הפיכה.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={handleCancelDelete} variant="outlined">ביטול</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" autoFocus>
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllCardsPage;
