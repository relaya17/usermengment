import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { loginUserThunk } from "../redux/thunks/authThunks";

import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
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
      />

      <TextField
        label="סיסמה"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        fullWidth
        size="large"
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? "טוען..." : "התחבר"}
      </Button>
    </Box>
  );
};

export default Login;
