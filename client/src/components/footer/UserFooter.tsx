import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // אייקון סימן קריאה

const UserFooter: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2,
        px: 2,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: 'divider',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width: '100%',
      }}
    >
      {/* אודות */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ErrorOutlineIcon fontSize="small" sx={{ color: 'primary.main' }} />
        <Typography variant="body2">אודות</Typography>
      </Box>
      {/* מועדפים */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FavoriteIcon fontSize="small" color="error" />
        <Typography variant="body2">מועדפים</Typography>
      </Box>
    </Box>
  );
};

export default UserFooter;
