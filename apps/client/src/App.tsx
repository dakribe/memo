import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import Protected from './pages/protected';

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
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
