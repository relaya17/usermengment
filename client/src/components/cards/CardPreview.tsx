// src/components/cards/CardPreview.tsx
import React from "react";
import { Box, Typography, IconButton, Stack, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { IUser } from "src/services/api";

interface CardPreviewProps {
  id: string;
  title: string; // כותרת ראשית
  subtitle: string; // כותרת משנית
  name: string;
  description: string;
  image: string;
  phone: string;
  address: string;
  cardNumber: number;
  user?: IUser;
  canEdit: boolean;
  onDelete: (id: string) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  id,
  title,
  subtitle,
  name,
  description,
  image,
  phone,
  address,
  cardNumber,
  user,
  canEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      role="region"
      aria-label={`כרטיס עבור ${name}`}
      sx={{
        width: 300,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: 2,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography variant="h6" component="h2">
        {title}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" component="p" sx={{ mb: 1 }}>
        {subtitle}
      </Typography>

      <Divider role="separator" aria-label="קו מפריד" />

      <img
        src={image}
        alt={`תמונה של ${name}`}
        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, marginTop: 8 }}
      />

      <Typography variant="h6" sx={{ mt: 1 }}>
        {name}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
        <LocationOnIcon fontSize="small" />
        <Typography variant="body2">{address}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={0.5}>
        <PhoneIcon fontSize="small" />
        <Typography variant="body2">{phone}</Typography>
      </Stack>

      <Typography variant="caption" display="block" mt={1}>
        מספר כרטיס: {cardNumber}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 1 }}>
        <IconButton onClick={() => navigate(`/card/${id}`)} aria-label="צפייה בפרטי הכרטיס">
          <InfoIcon />
        </IconButton>
        {canEdit && (
          <>
            <IconButton onClick={() => navigate(`/edit/${id}`)} aria-label="עריכת כרטיס">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(id)} aria-label="מחיקת כרטיס">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <FavoriteIcon color="error" aria-label="הוסף למועדפים" />
        <PhoneIcon color="primary" aria-label="התקשר" />
      </Box>
    </Box>
  );
};

export default CardPreview;
