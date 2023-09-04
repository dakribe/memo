import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Root from './pages/root';
import SignIn from './pages/signIn';
import Profile from './pages/profile';
import AuthGuard from './pages/AuthGuard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/signin" element={<SignIn />} />
                <Route element={<AuthGuard />}>
                    <Route path="/:username" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
