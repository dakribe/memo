import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard() {
    const loggedIn = window.localStorage.getItem('isLoggedIn');

    if (loggedIn === 'true') {
        return <Outlet />;
    }

    return <Navigate to="/signin" />;
}

export default AuthGuard;
