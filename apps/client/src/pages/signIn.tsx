import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';

function SignIn() {
    const { signIn } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        signIn(email, password);
    }

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <input type="text" onInput={(e) => setEmail(e.currentTarget.value)} />
                <input type="text" onInput={(e) => setPassword(e.currentTarget.value)} />
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default SignIn;
