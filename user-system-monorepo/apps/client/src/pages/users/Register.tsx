import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registerUserThunk } from '../../redux/thunks/authThunks';
import type { IRegisterData } from '../../services/api';
import { AlertColor } from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  state: string;
  street: string;
  houseNumber: string;
  zip: string;
  imageAlt?: string;
  role: 'admin' | 'business' | 'user';
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  country?: string;
  state?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  role?: string;
  [key: string]: string | undefined;
}

const Register = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<RegisterFormState>({
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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    if (name === 'image' && target.files && target.files[0]) {
      setImageFile(target.files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name as keyof FormErrors]: undefined }));
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value as RegisterFormState['role'],
    }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
  
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
      if (!formData[field as keyof RegisterFormState]) {
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
  
  const handleSubmit = (e: React.FormEvent) => {
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
  
    const apiRegisterData: IRegisterData = {
      ...formData,
      image: imageFile,
    };
  
    dispatch(registerUserThunk(apiRegisterData))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: 'הרשמה בוצעה בהצלחה!', severity: 'success' });
        handleReset();
      })
      .catch((err: any) => {
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

  return (
    <Container component="main" maxWidth="md" sx={{ my: 4, direction: 'rtl' }}>
      <Card>
        <CardHeader title="טופס הרשמה" subheader="מלאו את כל השדות" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              {/* שמות */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="שם פרטי"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.firstName || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="שם משפחה"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.lastName || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>

              {/* אימייל וטלפון */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="אימייל"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.email || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="טלפון"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.phone || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>

              {/* סיסמה */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="סיסמה"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.password || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mb: 1, display: 'block' }}>
                  הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ספרה ותו מיוחד (!@#$%^&*)
                </Typography>
              </Grid>

              {/* העלאת תמונה + תיאור */}
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" component="label" fullWidth>
                  העלאת תמונה
                  <input
                    type="file"
                    name="image"
                    hidden
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                </Button>
                {imageFile && <Typography variant="body2">{imageFile.name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="טקסט חלופי לתמונה"
                  name="imageAlt"
                  value={formData.imageAlt || ''}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* כתובת */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="מדינה"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={!!errors.country} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.country || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="עיר"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={!!errors.state} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.state || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="רחוב"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  error={!!errors.street} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.street || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="מספר בית"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  error={!!errors.houseNumber} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.houseNumber || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="מיקוד"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  error={!!errors.zip} // 🆕 זה גורם לשדה ולטקסט להיות אדומים
                  helperText={errors.zip || "שדה חובה"} // 🆕 זה הטקסט האדום שמופיע מתחת לשדה
                />
              </Grid>

              {/* תפקיד */}
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.role}> {/* 🆕 זה גורם לתווית "תפקיד" להיות אדומה */}
                  <FormLabel>תפקיד</FormLabel>
                  <RadioGroup row name="role" value={formData.role} onChange={handleRoleChange}>
                    <FormControlLabel value="user" control={<Radio />} label="משתמש" />
                    <FormControlLabel value="business" control={<Radio />} label="עסק" />
                    <FormControlLabel value="admin" control={<Radio />} label="אדמין" />
                  </RadioGroup>
                  {errors.role && (
                    <Typography variant="caption" color="error"> {/* 🆕 זה הטקסט האדום שמופיע מתחת לכפתורי הרדיו */}
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* כפתורים */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                  startIcon={<DeleteIcon />}
                >
                  מחיקה
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleReset}
                  endIcon={<RefreshIcon />}
                >
                  איפוס
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'שלח'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
