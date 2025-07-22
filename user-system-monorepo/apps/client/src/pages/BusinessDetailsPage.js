import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux"; // אם אתה משתמש ברידאקס
// או תביא את המידע דרך API לפי הצורך
const BusinessDetailsPage = () => {
    const { id } = useParams(); // נקבל מזהה מה-URL
    const cards = useSelector((state) => state.cards.cards); // מתוך Redux
    const card = cards.find((c) => c.id === id); // מצא את הכרטיס לפי ID
    if (!card) {
        return _jsx(Typography, { variant: "h6", children: "Card not found" });
    }
    return (_jsx(Box, { sx: { p: 3 }, children: _jsxs(Paper, { elevation: 3, sx: { p: 3 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: card.name }), _jsx(Typography, { variant: "subtitle1", children: card.description }), _jsxs(Typography, { variant: "body1", children: ["\uD83D\uDCCD ", card.address] }), _jsxs(Typography, { variant: "body1", children: ["\uD83D\uDCDE ", card.phone] }), _jsxs(Typography, { variant: "body1", children: ["\u2709\uFE0F ", card.email] })] }) }));
};
export default BusinessDetailsPage;
