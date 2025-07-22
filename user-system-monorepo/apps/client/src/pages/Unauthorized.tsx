// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const UnauthorizedPage: React.FC = () => {
  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" color="error" gutterBottom>
        401 - אין הרשאה
      </Typography>
      <Typography variant="body1">
        אין לך הרשאה לצפות בדף זה.
      </Typography>
    </Container>
  );
};

export default UnauthorizedPage;
