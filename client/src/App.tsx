    // src/App.tsx
    import React from 'react';
    import { CssBaseline, Box } from '@mui/material';
    import { useAppSelector } from './redux/hooks'; 
    import AppRouter from './routes/AppRouter';

    // 🆕 ייבוא כל קבצי הפוטר הנדרשים:
    import GuestFooter from './components/footer/GuestFooter'; // הפוטר לאורח (לא מחובר)
    import UserFooter from './components/footer/UserFooter';   // הפוטר למשתמש רגיל מחובר
    import AdminFooter from './components/footer/AdminFooter'; 
    import BusinessFooter from './components/footer/BusinessFooter'; 

    const App = () => {
      const { isAuthenticated, user } = useAppSelector((state) => state.auth);

      let CurrentFooterComponent: React.ElementType; 

      // 🆕 לוגיקה מדויקת לבחירת קומפוננטת הפוטר לפי 4 המצבים:
      if (isAuthenticated) {
        if (user?.role === 'admin') {
          CurrentFooterComponent = AdminFooter;
        } else if (user?.role === 'business') {
          CurrentFooterComponent = BusinessFooter;
        } else {
          // 🆕 משתמש רגיל מחובר (role הוא 'user')
          CurrentFooterComponent = UserFooter; 
        }
      } else {
        // 🆕 אורח (לא מחובר כלל)
        CurrentFooterComponent = GuestFooter; 
      }

      return (
        <> 
          <CssBaseline /> 
          
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh" 
            bgcolor="background.default" 
            color="text.primary"        
          >
            <Box flex="1">
              <AppRouter /> 
            </Box>
            
            <CurrentFooterComponent /> {/* מרנדרים את הפוטר שנבחר */}
          </Box>
        </>
      );
    };

    export default App;
    