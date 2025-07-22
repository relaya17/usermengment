import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
const PrivateRoute = ({ allowedRoles, children, element }) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (user && allowedRoles.includes(user.role)) {
        if (element) {
            return element;
        }
        else if (children) {
            return _jsx(_Fragment, { children: children });
        }
        else {
            return _jsx(Outlet, {});
        }
    }
    else {
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
};
export default PrivateRoute;
