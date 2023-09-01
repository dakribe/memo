import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Protected from './pages/protected';
import Profile from './pages/profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
    {
        path: '/protected',
        element: <Protected />,
    },
    {
        path: '/:username',
        element: <Profile />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
