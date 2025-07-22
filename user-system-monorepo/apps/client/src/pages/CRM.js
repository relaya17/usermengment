import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/CRM.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container, } from "@mui/material";
// 🆕 שימוש ב-useTheme
import { useTheme } from '@mui/material/styles';
// הגדרת axios base URL (חשוב!)
axios.defaults.baseURL = 'http://localhost:5000/api';
const CRM = () => {
    const theme = useTheme(); // 🆕 גישה ל-theme הגלובלי
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const navigate = useNavigate();
    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };
    const handleCloseSnackbar = (event, reason) => {
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
        }
        catch (e) {
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
        }
        catch (e) {
            console.error("Error fetching users:", e);
            if (e.response && e.response.data && e.response.data.message) {
                setError(`שגיאה בטעינת המשתמשים: ${e.response.data.message}`);
            }
            else {
                setError("שגיאה בטעינת המשתמשים");
            }
            showSnackbar("שגיאה בטעינת המשתמשים", "error");
        }
        finally {
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
            }
            catch (e) {
                // Token issue handled by the first useEffect
            }
        }
    }, []);
    const changeRole = async (userId, newRole) => {
        try {
            await axios.patch(`/users/${userId}/role`, { role: newRole });
            setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
            showSnackbar(`תפקיד המשתמש ${userId} שונה בהצלחה ל-${newRole}`, "success");
        }
        catch (e) {
            console.error("Error changing role:", e);
            showSnackbar(`שגיאה בשינוי תפקיד המשתמש: ${e.response?.data?.message || 'שגיאה לא ידועה'}`, "error");
        }
    };
    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setOpenConfirmDialog(true);
    };
    const handleConfirmDelete = async () => {
        setOpenConfirmDialog(false);
        if (!userToDelete)
            return;
        try {
            await axios.delete(`/users/${userToDelete}`);
            setUsers((prev) => prev.filter((u) => u._id !== userToDelete));
            showSnackbar(`המשתמש ${userToDelete} נמחק בהצלחה.`, "success");
        }
        catch (e) {
            console.error("Error deleting user:", e);
            showSnackbar(`שגיאה במחיקת המשתמש: ${e.response?.data?.message || 'שגיאה לא ידועה'}`, "error");
        }
        finally {
            setUserToDelete(null);
        }
    };
    const handleCancelDelete = () => {
        setOpenConfirmDialog(false);
        setUserToDelete(null);
    };
    if (loading) {
        return (_jsxs(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }, children: [_jsx(CircularProgress, {}), _jsx(Typography, { variant: "h6", sx: { ml: 2 }, children: "\u05D8\u05D5\u05E2\u05DF \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD..." })] }));
    }
    if (error) {
        return (_jsxs(Container, { maxWidth: "md", sx: { mt: 4, textAlign: 'center' }, children: [_jsx(Alert, { severity: "error", children: error }), _jsx(Button, { variant: "contained", onClick: fetchUsers, sx: { mt: 2 }, children: "\u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1" })] }));
    }
    return (_jsxs(Container, { maxWidth: "lg", sx: { mt: 4, direction: 'rtl' }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "\u05DE\u05E2\u05E8\u05DB\u05EA CRM - \u05E0\u05D9\u05D4\u05D5\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD" }), users.length === 0 ? (_jsx(Alert, { severity: "info", sx: { mt: 3, textAlign: 'right' }, children: "\u05D0\u05D9\u05DF \u05DE\u05E9\u05EA\u05DE\u05E9\u05D9\u05DD \u05DC\u05D4\u05E6\u05D2\u05D4." })) : (_jsx(TableContainer, { component: Paper, sx: { mt: 3 }, children: _jsxs(Table, { "aria-label": "user management table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9" }), _jsx(TableCell, { children: "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC" }), _jsx(TableCell, { children: "\u05EA\u05E4\u05E7\u05D9\u05D3" }), _jsx(TableCell, { children: "\u05E4\u05E2\u05D5\u05DC\u05D5\u05EA" })] }) }), _jsx(TableBody, { children: users.map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: user.role }), _jsx(TableCell, { children: user.role !== "admin" ? (_jsxs(Box, { sx: { display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }, children: [user.role === "user" && (_jsx(Button, { variant: "outlined", color: "primary", size: "small", onClick: () => changeRole(user._id, "business"), children: "\u05D4\u05E4\u05D5\u05DA \u05DC\u05E2\u05E1\u05E7\u05D9" })), user.role === "business" && (_jsx(Button, { variant: "outlined", color: "secondary", size: "small", onClick: () => changeRole(user._id, "user"), children: "\u05D4\u05E4\u05D5\u05DA \u05DC\u05E8\u05D2\u05D9\u05DC" })), _jsx(Button, { variant: "contained", color: "error", size: "small", onClick: () => handleDeleteClick(user._id), children: "\u05DE\u05D7\u05E7" })] })) : (_jsx(Typography, { variant: "body2", color: "text.secondary", children: _jsx("em", { children: "\u05DE\u05E0\u05D4\u05DC \u05DE\u05E2\u05E8\u05DB\u05EA" }) })) })] }, user._id))) })] }) })), _jsx(Snackbar, { open: snackbar.open, autoHideDuration: 6000, onClose: handleCloseSnackbar, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleCloseSnackbar, severity: snackbar.severity, sx: { width: '100%', textAlign: 'right' }, children: snackbar.message }) }), _jsxs(Dialog, { open: openConfirmDialog, onClose: handleCancelDelete, "aria-labelledby": "confirm-delete-dialog-title", "aria-describedby": "confirm-delete-dialog-description", children: [_jsx(DialogTitle, { id: "confirm-delete-dialog-title", children: "אישור מחיקת משתמש" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "confirm-delete-dialog-description", children: "\u05D4\u05D0\u05DD \u05D0\u05EA\u05D4 \u05D1\u05D8\u05D5\u05D7 \u05E9\u05D1\u05E8\u05E6\u05D5\u05E0\u05DA \u05DC\u05DE\u05D7\u05D5\u05E7 \u05DE\u05E9\u05EA\u05DE\u05E9 \u05D6\u05D4? \u05E4\u05E2\u05D5\u05DC\u05D4 \u05D6\u05D5 \u05D4\u05D9\u05D0 \u05D1\u05DC\u05EA\u05D9 \u05D4\u05E4\u05D9\u05DB\u05D4." }) }), _jsxs(DialogActions, { sx: { justifyContent: 'flex-start' }, children: [_jsx(Button, { onClick: handleCancelDelete, variant: "outlined", children: "\u05D1\u05D9\u05D8\u05D5\u05DC" }), _jsx(Button, { onClick: handleConfirmDelete, variant: "contained", color: "error", autoFocus: true, children: "\u05DE\u05D7\u05E7" })] })] })] }));
};
export default CRM;
