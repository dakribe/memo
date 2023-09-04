import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <main className="h-screen flex justify-center items-center">
            <Outlet />
        </main>
    );
}

export default AuthLayout;
