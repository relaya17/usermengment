import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
const BusinessCard = ({ business, onToggleFavorite, }) => {
    const { title, description, image, phone, address, _id, likedBy } = business;
    const navigate = useNavigate();
    const isFavorited = likedBy && likedBy.length > 0;
    return (_jsxs(Card, { sx: { maxWidth: 345, margin: "auto" }, role: "region", "aria-label": `Business card for ${title}`, children: [_jsx(CardMedia, { component: "img", height: "140", image: image, alt: `Image representing ${title}` }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", component: "h2", children: title }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 1 }, children: description }), _jsxs(Typography, { variant: "body2", "aria-label": `Phone number: ${phone}`, children: ["\uD83D\uDCDE ", phone] }), _jsxs(Typography, { variant: "body2", "aria-label": `Address: ${address}`, children: ["\uD83D\uDCCD ", address] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", "aria-label": `Card number: ${_id}`, children: ["Card Number: ", _id] })] }), _jsxs(CardActions, { sx: { justifyContent: "space-between" }, children: [_jsx(IconButton, { "aria-label": `Call ${title}`, component: "a", href: `tel:${phone}`, children: _jsx(PhoneIcon, {}) }), _jsx(IconButton, { "aria-label": `${isFavorited ? "Remove from" : "Add to"} favorites`, onClick: () => onToggleFavorite && onToggleFavorite(_id), color: isFavorited ? "error" : "default", children: _jsx(FavoriteIcon, {}) }), _jsx(IconButton, { "aria-label": `More info about ${title}`, onClick: () => navigate(`/business/${_id}`), children: _jsx(InfoIcon, {}) })] }), _jsxs(CardActions, { sx: { justifyContent: "center", gap: 2 }, children: [_jsx(IconButton, { "aria-label": "\u05D4\u05EA\u05E7\u05E9\u05E8", component: "a", href: `tel:${phone}`, children: _jsx(PhoneIcon, { color: "primary" }) }), _jsx(IconButton, { "aria-label": "\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD", onClick: () => onToggleFavorite && onToggleFavorite(_id), children: _jsx(FavoriteIcon, { color: isFavorited ? "error" : "action" }) })] })] }));
};
export default BusinessCard;
