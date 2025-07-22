import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CssBaseline, Box } from '@mui/material';
import { useAppSelector } from './redux/hooks';
import AppRouter from './routes/AppRouter';
// 🆕 ייבוא כל קבצי הפוטר הנדרשים:
import GuestFooter from './components/footer/GuestFooter'; // הפוטר לאורח (לא מחובר)
import UserFooter from './components/footer/UserFooter'; // הפוטר למשתמש רגיל מחובר
import AdminFooter from './components/footer/AdminFooter';
import BusinessFooter from './components/footer/BusinessFooter';
const App = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    let CurrentFooterComponent;
    // 🆕 לוגיקה מדויקת לבחירת קומפוננטת הפוטר לפי 4 המצבים:
    if (isAuthenticated) {
        if (user?.role === 'admin') {
            CurrentFooterComponent = AdminFooter;
        }
        else if (user?.role === 'business') {
            CurrentFooterComponent = BusinessFooter;
        }
        else {
            // 🆕 משתמש רגיל מחובר (role הוא 'user')
            CurrentFooterComponent = UserFooter;
        }
    }
    else {
        // 🆕 אורח (לא מחובר כלל)
        CurrentFooterComponent = GuestFooter;
    }
    return (_jsxs(_Fragment, { children: [_jsx(CssBaseline, {}), _jsxs(Box, { display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "background.default", color: "text.primary", children: [_jsx(Box, { flex: "1", children: _jsx(AppRouter, {}) }), _jsx(CurrentFooterComponent, {}), " "] })] }));
};
export default App;
