import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/routes/AppRouter.tsx
import { Route, Routes } from "react-router-dom";
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
    return (_jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "about", element: _jsx(About, {}) }), _jsx(Route, { path: "welcomePage", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "cardsPage", element: _jsx(CardsPage, {}) }), _jsx(Route, { path: "business-card/:id", element: _jsx(BusinessDetailPage, {}) }), _jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "register", element: _jsx(Register, {}) }), _jsx(Route, { path: "verify-email", element: _jsx(VerifyEmail, {}) }), _jsx(Route, { path: "forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "profile", element: _jsx(PrivateRoute, { allowedRoles: ["user", "business", "admin"], element: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "favorites", element: _jsx(PrivateRoute, { allowedRoles: ["user", "business", "admin"], element: _jsx(FavoritesPage, {}) }) }), _jsx(Route, { path: "dashboard", element: _jsx(PrivateRoute, { allowedRoles: ["user", "business", "admin"], element: _jsx(Dashboard, {}) }) })] }), _jsx(Route, { path: "/unauthorized", element: _jsx(Unauthorized, {}) }), _jsxs(Route, { path: "/business-portal", element: _jsx(PrivateRoute, { allowedRoles: ["business", "admin"], children: _jsx(BusinessLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "my-cards", element: _jsx("div", { children: "My Business Cards Page" }) }), _jsx(Route, { path: "create-card", element: _jsx(CreateCardPage, {}) }), _jsx(Route, { path: "edit-card/:id", element: _jsx(EditCard, {}) }), _jsx(Route, { path: "about", element: _jsx(About, {}) }), _jsx(Route, { path: "favorites", element: _jsx(FavoritesPage, {}) })] }), _jsxs(Route, { path: "/admin-portal", element: _jsx(PrivateRoute, { allowedRoles: ["admin"], children: _jsx(AdminLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "crm", element: _jsx("div", { children: "CRM Page (Admin Only)" }) }), _jsx(Route, { path: "sandbox", element: _jsx("div", { children: "Admin Sandbox Page (Admin Only)" }) }), _jsx(Route, { path: "users", element: _jsx("div", { children: "User Management (Admin Only)" }) }), _jsx(Route, { path: "about", element: _jsx(About, {}) }), _jsx(Route, { path: "create-card", element: _jsx(CreateCardPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
};
export default AppRouter;
