import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { User } from "@shared/types"; // תוודא שיש לך את המודל הזה
import { useSelector } from "react-redux"; // אם אתה משתמש ברידאקס
// או תביא את המידע דרך API לפי הצורך

const BusinessDetailsPage: React.FC = () => {
  const { id } = useParams(); // נקבל מזהה מה-URL
  const cards = useSelector((state: any) => state.cards.cards); // מתוך Redux
  const card = cards.find((c: any) => c.id === id); // מצא את הכרטיס לפי ID

  if (!card) {
    return <Typography variant="h6">Card not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="subtitle1">{card.description}</Typography>
        <Typography variant="body1">📍 {card.address}</Typography>
        <Typography variant="body1">📞 {card.phone}</Typography>
        <Typography variant="body1">✉️ {card.email}</Typography>
        {/* תוכל להוסיף תמונה או לוגו כאן */}
      </Paper>
    </Box>
  );
};

export default BusinessDetailsPage;
