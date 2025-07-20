// src/components/footer/BusinessFooter.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const BusinessFooter: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
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
      }}
    >
      {/* אודות */}
      <InfoIcon fontSize="medium" />
      {/* מועדפים */}
      <FavoriteIcon fontSize="medium" />
      {/* הכרטיסים שלי */}
      <CreditCardIcon fontSize="medium" />
    </Box>
  );
};

export default BusinessFooter;
