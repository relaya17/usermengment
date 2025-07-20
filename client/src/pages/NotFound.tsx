import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Box>
        <Typography variant="h2" color="error" gutterBottom>
          404 - הדף לא נמצא
        </Typography>
        <Typography variant="body1" gutterBottom>
          הדף שחיפשת לא קיים או הועבר לכתובת אחרת.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}
          sx={{ mt: 3 }}>
          חזרה לדף הבית
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 