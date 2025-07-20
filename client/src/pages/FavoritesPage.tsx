// src/pages/FavoriteCardsPage.tsx
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
} from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon // Heart icons
} from '@mui/icons-material';
// 🆕 הסרת createTheme ו-ThemeProvider מכאן - הם מגיעים מ-App.tsx
import { AlertColor } from '@mui/material/Alert';

// 🆕 ממשק עבור נתוני כרטיס ביקור
interface IBusinessCard {
  _id: string; // ID ייחודי לכרטיס
  title: string;
  description: string;
  phone: string;
  email: string;
  web?: string; // אופציונלי
  imageUrl: string;
  imageAlt?: string; // אופציונלי
  address: { // שדות כתובת מקובצים
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  cardNumber?: string; // מותאם לשדה "Card Number" בתמונה
  isFavorite: boolean; // כדי לנהל אם הכרטיס מועדף
}

// 🆕 נתונים מדומים של כרטיסים
const mockCards: IBusinessCard[] = [
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
  const [favoriteCards, setFavoriteCards] = useState<IBusinessCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false, message: "", severity: "success"
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
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
    } catch (e: any) {
      console.error("Error fetching favorite cards:", e);
      setError("שגיאה בטעינת כרטיסים מועדפים.");
      showSnackbar("שגיאה בטעינת כרטיסים מועדפים.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteCards();
  }, []);

  const toggleFavorite = async (cardId: string) => {
    const cardToToggle = favoriteCards.find(card => card._id === cardId);
    if (!cardToToggle) return;

    const newFavoriteStatus = !cardToToggle.isFavorite;

    setFavoriteCards(prevCards =>
      prevCards.map(card =>
        card._id === cardId ? { ...card, isFavorite: newFavoriteStatus } : card
      ).filter(card => card.isFavorite)
    );

    try {
      console.log(`Card ${cardId} favorite status toggled to ${newFavoriteStatus}`);
      showSnackbar(
        newFavoriteStatus ? 'הכרטיס נוסף למועדפים!' : 'הכרטיס הוסר מהמועדפים.',
        'success'
      );
    } catch (e: any) {
      console.error("Error toggling favorite status:", e);
      setFavoriteCards(prevCards =>
        prevCards.map(card =>
          card._id === cardId ? { ...card, isFavorite: !newFavoriteStatus } : card
        ).filter(card => card.isFavorite)
      );
      showSnackbar(`שגיאה בשינוי מועדפים: ${e.message || 'שגיאה לא ידועה'}`, 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, textAlign: 'center' }}>טוען כרטיסים מועדפים...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={fetchFavoriteCards} sx={{ mt: 2 }}>נסה לטעון שוב</Button>
      </Container>
    );
  }

  return (
    // 🆕 אין צורך ב-ThemeProvider כאן - הוא מגיע מ-App.tsx
    <Container component="main" maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Favorite Cards Page
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
          Here you can find all your favorite business cards
        </Typography>

        <Grid container spacing={3}>
          {favoriteCards.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ textAlign: 'right' }}>
                אין לך כרטיסים מועדפים כרגע.
              </Alert>
            </Grid>
          ) : (
            favoriteCards.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={card.imageUrl}
                    alt={card.imageAlt || card.title}
                    sx={{ borderRadius: '12px 12px 0 0', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/eeeeee/aaaaaa?text=No+Image'; }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {card.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.primary">
                        <strong>Phone:</strong> {card.phone}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        <strong>Card Number:</strong> {card.cardNumber || 'N/A'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => toggleFavorite(card._id)}
                        sx={{ color: card.isFavorite ? 'red' : 'inherit' }}
                      >
                        {card.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      {/* 🆕 Snackbar - נשאר כאן, אך וודא שה-anchorOrigin תואם את ה-theme הגלובלי או שאתה רוצה אותו כאן ספציפית */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', textAlign: 'right' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FavoritsPage;
