import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CircularProgress, Alert, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Snackbar, Card, CardContent, CardHeader, IconButton, InputAdornment, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerUserThunk } from '../../redux/thunks/authThunks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Register = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        country: '',
        state: '',
        street: '',
        houseNumber: '',
        zip: '',
        imageAlt: '',
        role: 'user',
    });
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [showPassword, setShowPassword] = useState(false);
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    };
    const handleInputChange = (e) => {
        const target = e.target;
        const { name, value } = target;
        if (name === 'image' && target.files && target.files[0]) {
            setImageFile(target.files[0]);
        }
        else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: undefined }));
            }
        }
    };
    const handleRoleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            role: e.target.value,
        }));
        if (errors.role) {
            setErrors((prev) => ({ ...prev, role: undefined }));
        }
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        // בדיקות
        if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
            newErrors.firstName = 'שם פרטי חייב להכיל לפחות 2 תווים';
            isValid = false;
        }
        if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
            newErrors.lastName = 'שם משפחה חייב להכיל לפחות 2 תווים';
            isValid = false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email.trim())) {
            newErrors.email = 'אימייל לא תקין';
            isValid = false;
        }
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
            newErrors.phone = 'טלפון חייב להיות 10 ספרות';
            isValid = false;
        }
        if (!validatePassword(formData.password)) {
            newErrors.password =
                'הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ספרה ותו מיוחד (!@#$%^&*)';
            isValid = false;
        }
        ['country', 'state', 'street', 'houseNumber', 'zip'].forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = 'שדה חובה';
                isValid = false;
            }
        });
        if (!formData.role) {
            newErrors.role = 'יש לבחור תפקיד';
            isValid = false;
        }
        setErrors(newErrors);
        console.log("🔍 שגיאות ולידציה:", newErrors); // כאן תראה בדיוק איזה שדה לא תקין
        return isValid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("🟢 handleSubmit הופעל"); // נרשום תמיד כש Submit נלחץ
        console.log("📋 formData:", formData); // הדפסת כל הנתונים של הטופס
        const isValid = validateForm();
        if (!isValid) {
            console.log("❌ הטופס לא עבר ולידציה"); // אם יש שגיאות בטופס
            setSnackbar({ open: true, message: 'יש לתקן שגיאות בטופס', severity: 'error' });
            return;
        }
        console.log("✅ הטופס תקין, שולחים נתונים לשרת"); // אם הכול תקין
        const apiRegisterData = {
            ...formData,
            image: imageFile,
        };
        dispatch(registerUserThunk(apiRegisterData))
            .unwrap()
            .then(() => {
            setSnackbar({ open: true, message: 'הרשמה בוצעה בהצלחה!', severity: 'success' });
            handleReset();
        })
            .catch((err) => {
            setSnackbar({ open: true, message: `שגיאה בהרשמה: ${err}`, severity: 'error' });
        });
    };
    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            country: '',
            state: '',
            street: '',
            houseNumber: '',
            zip: '',
            imageAlt: '',
            role: 'user',
        });
        setImageFile(null);
        setErrors({});
    };
    const handleCancel = () => {
        handleReset();
    };
    return (_jsxs(Container, { component: "main", maxWidth: "md", sx: { my: 4, direction: 'rtl' }, children: [_jsxs(Card, { children: [_jsx(CardHeader, { title: "\u05D8\u05D5\u05E4\u05E1 \u05D4\u05E8\u05E9\u05DE\u05D4", subheader: "\u05DE\u05DC\u05D0\u05D5 \u05D0\u05EA \u05DB\u05DC \u05D4\u05E9\u05D3\u05D5\u05EA" }), _jsx(CardContent, { children: _jsx(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9", name: "firstName", value: formData.firstName, onChange: handleInputChange, error: !!errors.firstName, helperText: errors.firstName || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4", name: "lastName", value: formData.lastName, onChange: handleInputChange, error: !!errors.lastName, helperText: errors.lastName || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", name: "email", value: formData.email, onChange: handleInputChange, error: !!errors.email, helperText: errors.email || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05D8\u05DC\u05E4\u05D5\u05DF", name: "phone", value: formData.phone, onChange: handleInputChange, error: !!errors.phone, helperText: errors.phone || "שדה חובה" }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(TextField, { fullWidth: true, type: showPassword ? "text" : "password", label: "\u05E1\u05D9\u05E1\u05DE\u05D4", name: "password", value: formData.password, onChange: handleInputChange, error: !!errors.password, helperText: errors.password || "שדה חובה", InputProps: {
                                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": showPassword ? "הסתר סיסמה" : "הצג סיסמה", onClick: () => setShowPassword((prev) => !prev), edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                                } }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { mt: 0.5, mb: 1, display: 'block' }, children: "\u05D4\u05E1\u05D9\u05E1\u05DE\u05D4 \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05DB\u05D9\u05DC \u05DC\u05E4\u05D7\u05D5\u05EA 8 \u05EA\u05D5\u05D5\u05D9\u05DD, \u05D0\u05D5\u05EA \u05D2\u05D3\u05D5\u05DC\u05D4, \u05D0\u05D5\u05EA \u05E7\u05D8\u05E0\u05D4, \u05E1\u05E4\u05E8\u05D4 \u05D5\u05EA\u05D5 \u05DE\u05D9\u05D5\u05D7\u05D3 (!@#$%^&*)" })] }), _jsxs(Grid, { item: true, xs: 12, sm: 6, children: [_jsxs(Button, { variant: "outlined", component: "label", fullWidth: true, children: ["\u05D4\u05E2\u05DC\u05D0\u05EA \u05EA\u05DE\u05D5\u05E0\u05D4", _jsx("input", { type: "file", name: "image", hidden: true, onChange: handleInputChange, accept: "image/*" })] }), imageFile && _jsx(Typography, { variant: "body2", children: imageFile.name })] }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05D8\u05E7\u05E1\u05D8 \u05D7\u05DC\u05D5\u05E4\u05D9 \u05DC\u05EA\u05DE\u05D5\u05E0\u05D4", name: "imageAlt", value: formData.imageAlt || '', onChange: handleInputChange }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05DE\u05D3\u05D9\u05E0\u05D4", name: "country", value: formData.country, onChange: handleInputChange, error: !!errors.country, helperText: errors.country || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(TextField, { fullWidth: true, label: "\u05E2\u05D9\u05E8", name: "state", value: formData.state, onChange: handleInputChange, error: !!errors.state, helperText: errors.state || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "\u05E8\u05D7\u05D5\u05D1", name: "street", value: formData.street, onChange: handleInputChange, error: !!errors.street, helperText: errors.street || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 6, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "\u05DE\u05E1\u05E4\u05E8 \u05D1\u05D9\u05EA", name: "houseNumber", value: formData.houseNumber, onChange: handleInputChange, error: !!errors.houseNumber, helperText: errors.houseNumber || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 6, sm: 4, children: _jsx(TextField, { fullWidth: true, label: "\u05DE\u05D9\u05E7\u05D5\u05D3", name: "zip", value: formData.zip, onChange: handleInputChange, error: !!errors.zip, helperText: errors.zip || "שדה חובה" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { component: "fieldset", error: !!errors.role, children: [" ", _jsx(FormLabel, { children: "\u05EA\u05E4\u05E7\u05D9\u05D3" }), _jsxs(RadioGroup, { row: true, name: "role", value: formData.role, onChange: handleRoleChange, children: [_jsx(FormControlLabel, { value: "user", control: _jsx(Radio, {}), label: "\u05DE\u05E9\u05EA\u05DE\u05E9" }), _jsx(FormControlLabel, { value: "business", control: _jsx(Radio, {}), label: "\u05E2\u05E1\u05E7" }), _jsx(FormControlLabel, { value: "admin", control: _jsx(Radio, {}), label: "\u05D0\u05D3\u05DE\u05D9\u05DF" })] }), errors.role && (_jsxs(Typography, { variant: "caption", color: "error", children: [" ", errors.role] }))] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", color: "error", onClick: handleCancel, startIcon: _jsx(DeleteIcon, {}), children: "\u05DE\u05D7\u05D9\u05E7\u05D4" }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsx(Button, { fullWidth: true, variant: "outlined", color: "primary", onClick: handleReset, endIcon: _jsx(RefreshIcon, {}), children: "\u05D0\u05D9\u05E4\u05D5\u05E1" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { fullWidth: true, type: "submit", variant: "contained", disabled: loading, children: loading ? _jsx(CircularProgress, { size: 24, color: "inherit" }) : 'שלח' }) })] }) }) })] }), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: () => setSnackbar({ ...snackbar, open: false }), anchorOrigin: { vertical: 'top', horizontal: 'center' }, children: _jsx(Alert, { severity: snackbar.severity, onClose: () => setSnackbar({ ...snackbar, open: false }), sx: { width: '100%' }, children: snackbar.message }) })] }));
};
export default Register;
