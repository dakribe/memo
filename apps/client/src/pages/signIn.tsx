import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import { Link } from 'react-router-dom';

function SignIn() {
    const { signIn } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        signIn(email, password);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="border border-black-2 p-6">
                    <h1 className="text-center text-2xl font-medium mb-4">Memo</h1>
                    <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-2">
                        <input
                            type="text"
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            placeholder="Email"
                            className="border p-0.5 bg-slate-100"
                        />
                        <input
                            type="text"
                            onInput={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Password"
                            className="border p-0.5 bg-slate-100"
                        />
                        <button type="submit" className="bg-sky-500 text-white rounded-sm p-1">
                            Sign in
                        </button>
                        <p className="text-center text-sky-900 mt-2">
                            <a href="#">Forgot password?</a>
                        </p>
                    </form>
                </div>
                <div className="border border-black-2 flex items-center justify-center py-4 px-8 mt-2">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup">
                            <span className="text-sky-500">Sign up</span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
