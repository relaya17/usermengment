    // src/routes/PrivateRoute.tsx
    import React, { ReactElement } from 'react'; 
    import { Navigate, Outlet } from 'react-router-dom'; 
    import { useAppSelector } from '../redux/hooks';

    interface PrivateRouteProps {
      allowedRoles: string[];
      children?: React.ReactNode; 
      element?: ReactElement; 
    }

    const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, children, element }) => { 
      const { isAuthenticated, user } = useAppSelector((state) => state.auth);

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      if (user && allowedRoles.includes(user.role)) {
        if (element) {
            return element; 
        } else if (children) {
            return <>{children}</>; 
        } else {
            return <Outlet />; 
        }
      } else {
        return <Navigate to="/unauthorized" replace />;
      }
    };

    export default PrivateRoute;
    