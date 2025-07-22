import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUserThunk } from "../../redux/thunks/authThunks";

import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastRequest, setLastRequest] = useState<{ email: string; password: string } | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLastRequest({ email, password });
    navigate("/")    


  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={5}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" component="h2" textAlign="center">
        התחברות
      </Typography>

      <TextField
        label="אימייל"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        helperText="שדה חובה"
      />

      <TextField
        label="סיסמה"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        helperText="שדה חובה"
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

      <>
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
        <Button
          variant="text"
          color="secondary"
          onClick={() => setShowDebug((prev) => !prev)}
          sx={{ mt: 1 }}
        >
          {showDebug ? "הסתר קוד שנשלח" : "הצג קוד שנשלח ושגיאה"}
        </Button>
        {showDebug && lastRequest && (
          <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={2} fontFamily="monospace" fontSize={14}>
            <Typography variant="subtitle2">JSON שנשלח לשרת:</Typography>
            <pre style={{ direction: 'ltr', textAlign: 'left', margin: 0 }}>{JSON.stringify(lastRequest, null, 2)}</pre>
            <Typography variant="subtitle2" color="error" mt={1}>שגיאה מהשרת:</Typography>
            <pre style={{ direction: 'ltr', textAlign: 'left', margin: 0 }}>{error}</pre>
          </Box>
        )}
      </>

      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        fullWidth
        size="large"
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{ mt: 2 }}
      >
        {loading ? "טוען..." : "התחבר"}
      </Button>
    </Box>
  );
};

export default Login;
