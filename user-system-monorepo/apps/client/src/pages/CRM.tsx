// src/pages/CRM.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import { AlertColor } from '@mui/material/Alert';
// 🆕 שימוש ב-useTheme
import { useTheme } from '@mui/material/styles';

// הגדרת axios base URL (חשוב!)
axios.defaults.baseURL = 'http://localhost:5000/api';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "business" | "admin";
}

const CRM = () => {
  const theme = useTheme(); // 🆕 גישה ל-theme הגלובלי
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  // בדיקת הרשאות
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        showSnackbar("אין לך הרשאה לגשת לעמוד זה", "error");
        navigate("/");
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (e) {
      console.error("Invalid token:", e);
      showSnackbar("שגיאה בטוקן האימות, אנא התחבר מחדש.", "error");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // טעינת משתמשים
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (e: any) {
      console.error("Error fetching users:", e);
      if (e.response && e.response.data && e.response.data.message) {
        setError(`שגיאה בטעינת המשתמשים: ${e.response.data.message}`);
      } else {
        setError("שגיאה בטעינת המשתמשים");
      }
      showSnackbar("שגיאה בטעינת המשתמשים", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          fetchUsers();
        }
      } catch (e) {
        // Token issue handled by the first useEffect
      }
    }
  }, []);

  const changeRole = async (userId: string, newRole: IUser["role"]) => {
    try {
      await axios.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      showSnackbar(`תפקיד המשתמש ${userId} שונה בהצלחה ל-${newRole}`, "success");
    } catch (e: any) {
      console.error("Error changing role:", e);
      showSnackbar(`שגיאה בשינוי תפקיד המשתמש: ${e.response?.data?.message || 'שגיאה לא ידועה'}`, "error");
    }
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    if (!userToDelete) return;

    try {
      await axios.delete(`/users/${userToDelete}`);
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete));
      showSnackbar(`המשתמש ${userToDelete} נמחק בהצלחה.`, "success");
    } catch (e: any) {
      console.error("Error deleting user:", e);
      showSnackbar(`שגיאה במחיקת המשתמש: ${e.response?.data?.message || 'שגיאה לא ידועה'}`, "error");
    } finally {
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>טוען משתמשים...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={fetchUsers} sx={{ mt: 2 }}>נסה שוב</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        מערכת CRM - ניהול משתמשים
      </Typography>

      {users.length === 0 ? (
        <Alert severity="info" sx={{ mt: 3, textAlign: 'right' }}>אין משתמשים להצגה.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table aria-label="user management table">
            <TableHead>
              <TableRow>
                <TableCell>שם משתמש</TableCell>
                <TableCell>אימייל</TableCell>
                <TableCell>תפקיד</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role !== "admin" ? (
                      <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                        {user.role === "user" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => changeRole(user._id, "business")}
                          >
                            הפוך לעסקי
                          </Button>
                        )}
                        {user.role === "business" && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={() => changeRole(user._id, "user")}
                          >
                            הפוך לרגיל
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(user._id)}
                        >
                          מחק
                        </Button>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        <em>מנהל מערכת</em>
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', textAlign: 'right' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">{"אישור מחיקת משתמש"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            האם אתה בטוח שברצונך למחוק משתמש זה? פעולה זו היא בלתי הפיכה.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button onClick={handleCancelDelete} variant="outlined">ביטול</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error" autoFocus>
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CRM;
