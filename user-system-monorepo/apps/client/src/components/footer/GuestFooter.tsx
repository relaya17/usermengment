import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // אייקון סימן קריאה

const GuestFooter: React.FC = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      py: 1,
      px: 2,
      bgcolor: 'background.default',
      color: 'text.secondary',
      textAlign: 'center',
      borderTop: '1px solid',
      borderColor: 'divider',
      height: '50px', // עדיף גובה קצת יותר גדול כדי שיתאים לאייקון
      display: 'flex',
      flexDirection: 'column',  // כדי לסדר את האייקון מעל הטקסט
      alignItems: 'center',
      justifyContent: 'center',
    
        // רווח קטן בין האייקון לטקסט
    }}
  >

    
    <ErrorOutlineIcon sx={{ color: 'text.primary', fontSize: 20 }} />
    <Typography variant="body2" sx={{ direction: 'rtl', display: 'inline-block' }}>
      אודות
    </Typography>
  </Box>
);

export default GuestFooter;
