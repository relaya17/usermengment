// src/components/EditCardForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// 🆕 הסרת createTheme ו-ThemeProvider מכאן - הם מגיעים מ-App.tsx
import { AlertColor } from '@mui/material/Alert';

// 🆕 ממשק עבור נתוני כרטיס ביקור (מותאם לתמונה). וודא שזה תואם ל-backend.
interface ICardData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web?: string;
  imageUrl?: string;
  imageAlt?: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
}

// Props for the EditCardForm component
interface EditCardFormProps {
  initialCardData?: ICardData;
  onCardSaveSuccess?: (updatedCard: ICardData) => void;
  onCardCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

// 🆕 הסרת הגדרות Theme מכאן

// ממשק לשגיאות ולידציה מקומיות של הטופס
interface FormErrors {
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: string;
  imageURL?: string;
  imageAlt?: string;
  state?: string;
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
}

const EditCardForm: React.FC<EditCardFormProps> = ({
  initialCardData,
  onCardSaveSuccess,
  onCardCancel,
  loading: propLoading = false,
  error: propError = null,
}) => {
  const [formData, setFormData] = useState<ICardData>({
    title: '', subtitle: '', description: '', phone: '', email: '', web: '',
    imageUrl: '', imageAlt: '', state: '', country: '', city: '', street: '', houseNumber: '', zip: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (initialCardData) {
      setFormData(initialCardData);
    }
  }, [initialCardData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name as keyof FormErrors]: undefined }));
    }
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) { newErrors.title = 'Title is required.'; isValid = false; }
    if (!formData.subtitle.trim()) { newErrors.subtitle = 'Subtitle is required.'; isValid = false; }
    if (!formData.description.trim()) { newErrors.description = 'Description is required.'; isValid = false; }
    
    if (!formData.phone.trim() || !validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be a valid 10-digit number.'; isValid = false;
    }
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Email must be a valid email address.'; isValid = false;
    }

    if (!formData.country.trim()) { newErrors.country = 'Country is required.'; isValid = false; }
    if (!formData.city.trim()) { newErrors.city = 'City is required.'; isValid = false; } 
    if (!formData.street.trim()) { newErrors.street = 'Street is required.'; isValid = false; }
    if (!formData.houseNumber.trim() || !/^\d+$/.test(formData.houseNumber.trim())) {
      newErrors.houseNumber = 'House number is required and must be a number.'; isValid = false;
    }
    if (!formData.zip.trim() || !/^\d+$/.test(formData.zip.trim())) {
      newErrors.zip = 'Zip code is required and must be a number.'; isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      console.log('Attempting to save card:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbar({
        open: true,
        message: 'כרטיס ביקור נשמר בהצלחה!',
        severity: 'success',
      });
      if (onCardSaveSuccess) {
        onCardSaveSuccess(formData);
      }
    } catch (apiError: any) {
      console.error('שגיאה בשמירת כרטיס:', apiError);
      setSnackbar({
        open: true,
        message: `שגיאה בשמירת כרטיס: ${apiError.message || 'שגיאה לא ידועה'}`,
        severity: 'error',
      });
    }
  };

  const handleReset = () => {
    setFormData(initialCardData || {
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
    } else {
      console.log('Cancel clicked - No onCardCancel prop provided.');
      handleReset();
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    // 🆕 אין צורך ב-ThemeProvider ו-CssBaseline כאן - הם מגיעים מ-App.tsx
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      <Card>
        <CardHeader
          title="EDIT CARD"
          titleTypographyProps={{ variant: 'h5', textAlign: 'center' }}
          sx={{ pt: 4, pb: 2 }}
        />
        <CardContent sx={{ px: { xs: 2, sm: 4, md: 6 }, pb: 4 }}>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* שורה 1: Title, Subtitle */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  required
                  error={!!errors.subtitle}
                  helperText={errors.subtitle}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 2: Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={2}
                  error={!!errors.description}
                  helperText={errors.description}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 3: Phone, Email, Web */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Web"
                  name="web"
                  type="url"
                  value={formData.web}
                  onChange={handleInputChange}
                  error={!!errors.web}
                  helperText={errors.web}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 4: Image url, Image alt */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Image url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Image alt"
                  name="imageAlt"
                  value={formData.imageAlt}
                  onChange={handleInputChange}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 5: State, Country */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  error={!!errors.state}
                  helperText={errors.state}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  error={!!errors.country}
                  helperText={errors.country}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 6: City, Street */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  error={!!errors.city}
                  helperText={errors.city}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  error={!!errors.street}
                  helperText={errors.street}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* שורה 7: Housenumber, Zip */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Housenumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  required
                  error={!!errors.houseNumber}
                  helperText={errors.houseNumber}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  error={!!errors.zip}
                  helperText={errors.zip}
                  inputProps={{ style: { textAlign: 'right', direction: 'rtl' } }}
                  InputLabelProps={{ style: { right: 0, left: 'auto' } }}
                />
              </Grid>

              {/* Displaying Prop Errors if any (e.g., from Redux) */}
              {propError && (
                <Grid item xs={12}>
                  <Alert severity="error">{propError}</Alert>
                </Grid>
              )}

              {/* כפתורי CANCEL, Refresh, SUBMIT */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleCancel}
                  color="secondary"
                  sx={{ px: 4 }}
                >
                  CANCEL
                </Button>
                <IconButton
                  color="primary"
                  onClick={handleReset}
                  aria-label="reset form"
                  sx={{
                    '&:hover': {
                      // 🆕 שימוש ב-alpha דרך הפרופס של ה-theme
                      backgroundColor: (t) => t.palette.primary.light + '20',
                    }
                  }}
                >
                  <RefreshIcon />
                </IconButton>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={propLoading}
                  sx={{ px: 4 }}
                >
                  {propLoading ? <CircularProgress size={24} color="inherit" /> : "SUBMIT"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* 🆕 Snackbar - נשאר כאן */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditCardForm;
