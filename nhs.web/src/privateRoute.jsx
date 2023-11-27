/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the passed component
    return <Component {...rest} />;
};

export default PrivateRoute;
