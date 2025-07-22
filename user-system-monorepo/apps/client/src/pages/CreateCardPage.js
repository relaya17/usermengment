import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/CreateCardForm.tsx
import { useState } from 'react';
import { Box, Button, TextField, Container, Grid, CircularProgress, Alert, Snackbar, Card, CardContent, CardHeader, IconButton, } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
const CreateCardForm = ({ onCardCreateSuccess, onCardCancel, loading: propLoading = false, error: propError = null, }) => {
    const [formData, setFormData] = useState({
        title: '', subtitle: '', description: '', phone: '', email: '', web: '',
        imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '', houseNumber: '', zip: '',
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required.';
            isValid = false;
        }
        if (!formData.subtitle.trim()) {
            newErrors.subtitle = 'Subtitle is required.';
            isValid = false;
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
            isValid = false;
        }
        if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
            newErrors.email = 'Email must be a valid email address.';
            isValid = false;
        }
        if (!formData.phone.trim() || !validatePhone(formData.phone.trim())) {
            newErrors.phone = 'Phone number must be a valid 10-digit number.';
            isValid = false;
        }
        if (!formData.country.trim()) {
            newErrors.country = 'Country is required.';
            isValid = false;
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required.';
            isValid = false;
        }
        if (!formData.street.trim()) {
            newErrors.street = 'Street is required.';
            isValid = false;
        }
        if (!formData.houseNumber.trim() || !/^\d+$/.test(formData.houseNumber.trim())) {
            newErrors.houseNumber = 'House number is required and must be a number.';
            isValid = false;
        }
        if (!formData.zip.trim() || !/^\d+$/.test(formData.zip.trim())) {
            newErrors.zip = 'Zip code is required and must be a number.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) {
            setSnackbar({
                open: true,
                message: 'Please correct the errors in the form.',
                severity: 'error',
            });
            return;
        }
        try {
            console.log('Attempting to create card:', formData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const createdCardWithId = { ...formData, _id: 'new_card_id_' + Date.now() };
            setSnackbar({
                open: true,
                message: 'כרטיס ביקור נוצר בהצלחה!',
                severity: 'success',
            });
            if (onCardCreateSuccess) {
                onCardCreateSuccess(createdCardWithId);
            }
            handleReset();
        }
        catch (apiError) {
            console.error('שגיאה ביצירת כרטיס:', apiError);
            setSnackbar({
                open: true,
                message: `שגיאה ביצירת כרטיס: ${apiError.message || 'שגיאה לא ידועה'}`,
                severity: 'error',
            });
        }
    };
    const handleReset = () => {
        setFormData({
            title: '', subtitle: '', description: '', phone: '', email: '', web: '',
            imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '', houseNumber: '', zip: '',
        });
        setErrors({});
        setSnackbar({
            open: true,
            message: 'טופס אופס!',
            severity: 'info',
        });
    };
    const handleCancel = () => {
        if (onCardCancel) {
            onCardCancel();
        }
        else {
            console.log('Cancel clicked - No onCardCancel prop provided, resetting form.');
            handleReset();
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    return (
    // 🆕 אין צורך ב-ThemeProvider ו-CssBaseline כאן - הם מגיעים מ-App.tsx
    _jsxs(Container, { component: "main", maxWidth: "md", sx: { my: 4 }, children: [_jsxs(Card, { children: [_jsx(CardHeader, { title: "CREATE CARD", titleTypographyProps: { variant: 'h5', textAlign: 'center' }, sx: { pt: 4, pb: 2 } }), _jsx(CardContent, { sx: { px: { xs: 2, sm: 4, md: 6 }, pb: 4 }, children: _jsx(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Title *", name: "title", value: formData.title, onChange: handleInputChange, required: true, error: !!errors.title, helperText: errors.title, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Subtitle *", name: "subtitle", value: formData.subtitle, onChange: handleInputChange, required: true, error: !!errors.subtitle, helperText: errors.subtitle, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Description *", name: "description", value: formData.description, onChange: handleInputChange, required: true, multiline: true, rows: 2, error: !!errors.description, helperText: errors.description, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Phone *", name: "phone", type: "tel", value: formData.phone, onChange: handleInputChange, required: true, error: !!errors.phone, helperText: errors.phone, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Email *", name: "email", type: "email", value: formData.email, onChange: handleInputChange, required: true, error: !!errors.email, helperText: errors.email, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "Web", name: "web", type: "url", value: formData.web, onChange: handleInputChange, error: !!errors.web, helperText: errors.web, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Image url", name: "imageUrl", value: formData.imageUrl, onChange: handleInputChange, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Image alt", name: "imageAlt", value: formData.imageAlt, onChange: handleInputChange, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "State *", name: "state", value: formData.state, onChange: handleInputChange, required: true, error: !!errors.state, helperText: errors.state, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Country *", name: "country", value: formData.country, onChange: handleInputChange, required: true, error: !!errors.country, helperText: errors.country, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "City *", name: "city", value: formData.city, onChange: handleInputChange, required: true, error: !!errors.city, helperText: errors.city, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Street *", name: "street", value: formData.street, onChange: handleInputChange, required: true, error: !!errors.street, helperText: errors.street, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Housenumber *", name: "houseNumber", value: formData.houseNumber, onChange: handleInputChange, required: true, error: !!errors.houseNumber, helperText: errors.houseNumber, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "Zip *", name: "zip", value: formData.zip, onChange: handleInputChange, required: true, error: !!errors.zip, helperText: errors.zip, inputProps: { style: { textAlign: 'right', direction: 'rtl' } }, InputLabelProps: { style: { right: 0, left: 'auto' } } }) }), propError && (_jsx(Grid, { item: true, xs: 12, children: _jsx(Alert, { severity: "error", children: propError }) })), _jsxs(Grid, { item: true, xs: 12, sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }, children: [_jsx(Button, { type: "button", variant: "outlined", onClick: handleCancel, color: "secondary", sx: { px: 4 }, children: "CANCEL" }), _jsx(IconButton, { color: "primary", onClick: handleReset, "aria-label": "reset form", sx: {
                                                    '&:hover': {
                                                        // 🆕 שימוש ב-alpha דרך הפרופס של ה-theme
                                                        backgroundColor: (t) => t.palette.primary.light + '20',
                                                    }
                                                }, children: _jsx(RefreshIcon, {}) }), _jsx(Button, { type: "submit", variant: "contained", color: "primary", disabled: propLoading, sx: { px: 4 }, children: propLoading ? _jsx(CircularProgress, { size: 24, color: "inherit" }) : "SUBMIT" })] })] }) }) })] }), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: handleCloseSnackbar, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleCloseSnackbar, severity: snackbar.severity, sx: { width: '100%' }, children: snackbar.message }) })] }));
};
export default CreateCardForm;
