import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export function useSignIn() {
    const [error, setError] = useState('');
    const { setLoggedIn } = useAuthContext();
    const signIn = async (email: string, password: string) => {
        const res = await fetch('http://localhost:8000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();

        if (!res.ok) {
            setError('Invalid username or password');
        }
        window.localStorage.setItem('isLoggedIn', 'true');
        setLoggedIn(true);
        console.log(json);
    };

    return { signIn, error };
}
