    // src/pages/HomePage.tsx
    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { useAppSelector } from "../redux/hooks";
    import { 
      Box,
      Typography,
      IconButton,
      Card, 
      CardContent,
      CardMedia,
      Grid,
      Container
    } from "@mui/material";
    import EditIcon from "@mui/icons-material/Edit";
    import DeleteIcon from "@mui/icons-material/Delete";
    import PhoneIcon from '@mui/icons-material/Phone'; 
    import { useTheme } from "@mui/material/styles";

    // הרחבת ה-Card interface
    interface Card {
      id: string;
      name: string; 
      description: string; 
      image: string;
      isFavorite: boolean;
      phone: string;     
      address: string;   
      cardNumber: string; 
    }

    const HomePage: React.FC = () => {
      const [cards, setCards] = useState<Card[]>([]);
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

      return (
        <Container maxWidth="lg" sx={{ py: 4, direction: 'rtl' }}>
          <section style={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: 24, sm: 32, md: 36 } }}>
              ברוכים הבאים לאפליקציית ניהול כרטיסים
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: 16, sm: 20 } }}>
              יצירה, ניהול ושיתוף של כרטיסי ביקור דיגיטליים
            </Typography>
          </section>

          <Grid container spacing={3} justifyContent="center">
            {displayCards.length > 0 ? (
              displayCards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id} sx={{ display: 'flex', width: '100%' }}>
                  <Card
                    sx={{
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
                    }}
                  >
                    <Box sx={{ width: '100%', height: 220 }}>
                      <CardMedia
                        component="img"
                        image={card.image}
                        alt={card.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px 8px 0 0',
                          ...(card.name === 'מכון כושר' ? { objectPosition: 'center top' } : {})
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2, background: '#fff' }}>
                      <Typography variant="h6" sx={{ mt: 0, fontWeight: 'bold', textAlign: 'right' }}>
                        {card.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40, textAlign: 'right' }}>
                        {card.description}
                      </Typography>
                      <Box sx={{ mt: 2, textAlign: 'left', direction: 'ltr' }}>
                        <Typography variant="body2" color="text.primary">
                          טלפון: {card.phone}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          כתובת: {card.address}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          מספר כרטיס: {card.cardNumber}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        mt: 'auto',
                        px: 2,
                      }}
                    >
                      {canEdit && (
                        <>
                          <IconButton
                            onClick={() => navigate(`/edit/${card.id}`)}
                            aria-label="ערוך"
                            color="info"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              alert(`Delete card: ${card.name}`);
                            }}
                            aria-label="מחק"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        onClick={() => {
                          alert(`Calling: ${card.phone}`);
                        }}
                        aria-label="התקשר"
                        color="primary"
                      >
                        <PhoneIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                  אין כרטיסים זמינים כרגע.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      );
    };

    export default HomePage;
    