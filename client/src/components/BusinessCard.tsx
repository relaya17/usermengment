import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

interface BusinessCardProps {
  business: {
    _id: string;
    title: string;
    description: string;
    image: string;
    phone: string;
    address: string;
    likedBy?: string[];
  };
  onToggleFavorite?: (id: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onToggleFavorite,
}) => {
  const { title, description, image, phone, address, _id, likedBy } = business;
  const navigate = useNavigate();

  const isFavorited = likedBy && likedBy.length > 0;

  return (
    <Card
      sx={{ maxWidth: 345, margin: "auto" }}
      role="region"
      aria-label={`Business card for ${title}`}
    >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={`Image representing ${title}`}
      />
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" aria-label={`Phone number: ${phone}`}>
          📞 {phone}
        </Typography>
        <Typography variant="body2" aria-label={`Address: ${address}`}>
          📍 {address}
        </Typography>
        <Typography variant="body2" color="text.secondary" aria-label={`Card number: ${_id}`}>
          Card Number: {_id}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          aria-label={`Call ${title}`}
          component="a"
          href={`tel:${phone}`}
        >
          <PhoneIcon />
        </IconButton>

        <IconButton
          aria-label={`${isFavorited ? "Remove from" : "Add to"} favorites`}
          onClick={() => onToggleFavorite && onToggleFavorite(_id)}
          color={isFavorited ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>

        <IconButton
          aria-label={`More info about ${title}`}
          onClick={() => navigate(`/business/${_id}`)}
        >
          <InfoIcon />
        </IconButton>
      </CardActions>
      {/* הוספת שורת אייקונים בתחתית הכרטיס - תמיד מוצג לכל סוג משתמש */}
      <CardActions sx={{ justifyContent: "center", gap: 2 }}>
        <IconButton aria-label="התקשר" component="a" href={`tel:${phone}`}> 
          <PhoneIcon color="primary" />
        </IconButton>
        <IconButton aria-label="הוסף למועדפים" onClick={() => onToggleFavorite && onToggleFavorite(_id)}>
          <FavoriteIcon color={isFavorited ? "error" : "action"} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BusinessCard;
