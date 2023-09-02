import { createBrowserRouter } from 'react-router-dom';
import Profile from './profile';
import Protected from './protected';
import Root from './root';
import SignIn from './signIn';
import SignUp from './signUp';

export const routes = createBrowserRouter([
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
        path: '/:username',
        element: (
            <Protected>
                <Profile />
            </Protected>
        ),
    },
]);
