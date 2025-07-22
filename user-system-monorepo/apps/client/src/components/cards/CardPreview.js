import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography, IconButton, Stack, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
const CardPreview = ({ id, title, subtitle, name, description, image, phone, address, cardNumber, user, canEdit, onDelete, }) => {
    const navigate = useNavigate();
    return (_jsxs(Box, { component: "section", role: "region", "aria-label": `כרטיס עבור ${name}`, sx: {
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
        }, children: [_jsx(Typography, { variant: "h6", component: "h2", children: title }), _jsx(Typography, { variant: "subtitle2", color: "text.secondary", component: "p", sx: { mb: 1 }, children: subtitle }), _jsx(Divider, { role: "separator", "aria-label": "\u05E7\u05D5 \u05DE\u05E4\u05E8\u05D9\u05D3" }), _jsx("img", { src: image, alt: `תמונה של ${name}`, style: { width: "100%", height: 160, objectFit: "cover", borderRadius: 8, marginTop: 8 } }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: name }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: description }), _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "center", mt: 1, children: [_jsx(LocationOnIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: address })] }), _jsxs(Stack, { direction: "row", spacing: 1, justifyContent: "center", alignItems: "center", mt: 0.5, children: [_jsx(PhoneIcon, { fontSize: "small" }), _jsx(Typography, { variant: "body2", children: phone })] }), _jsxs(Typography, { variant: "caption", display: "block", mt: 1, children: ["\u05DE\u05E1\u05E4\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1: ", cardNumber] }), _jsxs(Box, { sx: { mt: 1, display: "flex", justifyContent: "center", gap: 1 }, children: [_jsx(IconButton, { onClick: () => navigate(`/card/${id}`), "aria-label": "\u05E6\u05E4\u05D9\u05D9\u05D4 \u05D1\u05E4\u05E8\u05D8\u05D9 \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1", children: _jsx(InfoIcon, {}) }), canEdit && (_jsxs(_Fragment, { children: [_jsx(IconButton, { onClick: () => navigate(`/edit/${id}`), "aria-label": "\u05E2\u05E8\u05D9\u05DB\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1", children: _jsx(EditIcon, {}) }), _jsx(IconButton, { onClick: () => onDelete(id), "aria-label": "\u05DE\u05D7\u05D9\u05E7\u05EA \u05DB\u05E8\u05D8\u05D9\u05E1", children: _jsx(DeleteIcon, {}) })] }))] }), _jsxs(Box, { mt: 2, display: "flex", justifyContent: "center", gap: 2, children: [_jsx(FavoriteIcon, { color: "error", "aria-label": "\u05D4\u05D5\u05E1\u05E3 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD" }), _jsx(PhoneIcon, { color: "primary", "aria-label": "\u05D4\u05EA\u05E7\u05E9\u05E8" })] })] }));
};
export default CardPreview;
