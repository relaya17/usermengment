import React from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Box
          textAlign="center"
          sx={{
            p: 4,
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            ברוכים הבאים ל־BCard!
          </Typography>

          <Typography variant="h6" color="text.secondary" mb={4}>
            הפלטפורמה החכמה ביותר לכרטיסי ביקור דיגיטליים, מותאמת לעסקים וללקוחות.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate("/register")}
            >
              התחילו עכשיו
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate("/about")}
            >
              מידע נוסף
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;
