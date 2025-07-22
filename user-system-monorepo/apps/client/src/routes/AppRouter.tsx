    // src/routes/AppRouter.tsx
    import { Navigate, Route, Routes } from "react-router-dom";
    import HomePage from "../pages/HomePage";
    import Login from "../pages/users/Login";
    import Register from "../pages/users/Register";
    import About from "../pages/About";
    import Dashboard from "../pages/users/Dashboard";
    import VerifyEmail from "../pages/Password/VerifyEmail";
    import ForgotPassword from "../pages/Password/ForgotPassword";
    import ResetPassword from "../pages/Password/ResetPassword"; 
    import PrivateRoute from "./PrivateRoute"; 
    import EditCard from "../pages/EditCard";
    import CreateCardPage from "../pages/CreateCardPage";
    import FavoritesPage from "../pages/FavoritesPage";
    import WelcomePage from "../pages/WelcomePage";
    import Unauthorized from "../pages/Unauthorized";
    import BusinessDetailPage from "../pages/BusinessDetailsPage";
    import ProfilePage from "../pages/ProfilePage";
    import CardsPage from "../pages/CardsPage"; 
    import NotFound from "../pages/NotFound";

    // ייבוא לייאאוטים שונים
    import MainLayout from "../layouts/MainLayout"; 
    import AdminLayout from "../layouts/AdminLayout"; 
    import BusinessLayout from "../layouts/BusinessLayout"; 

    const AppRouter = () => {
      return (
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="welcomePage" element={<WelcomePage />} />
          <Route path="cardsPage" element={<CardsPage />} />
          <Route path="business-card/:id" element={<BusinessDetailPage />} />
      
          {/* ✅ נוספו כאן במקום בחוץ */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          
          {/* Private routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute
                allowedRoles={["user", "business", "admin"]}
                element={<ProfilePage />}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <PrivateRoute
                allowedRoles={["user", "business", "admin"]}
                element={<FavoritesPage />}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute
                allowedRoles={["user", "business", "admin"]}
                element={<Dashboard />}
              />
            }
          />
        </Route>
      
        {/* מחוץ ל-MainLayout רק דפים מיוחדים */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      
        {/* שאר הלייאאוטים */}
        <Route
          path="/business-portal"
          element={
            <PrivateRoute allowedRoles={["business", "admin"]}>
              <BusinessLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="my-cards" element={<div>My Business Cards Page</div>} />
          <Route path="create-card" element={<CreateCardPage />} />
          <Route path="edit-card/:id" element={<EditCard />} />
          <Route path="about" element={<About />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      
        <Route
          path="/admin-portal"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crm" element={<div>CRM Page (Admin Only)</div>} />
          <Route path="sandbox" element={<div>Admin Sandbox Page (Admin Only)</div>} />
          <Route path="users" element={<div>User Management (Admin Only)</div>} />
          <Route path="about" element={<About />} />
          <Route path="create-card" element={<CreateCardPage />} />
        </Route>
      
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      );
    };

    export default AppRouter;
    