import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <div>
            <SignUpForm />
        </div>
    );
}

export default SignUp;

function SignUpForm() {
    return (
        <>
            <div className="border border-black-2 p-6">
                <h1 className="text-center text-2xl font-medium mb-4">Memo</h1>
                <form className="flex flex-col gap-2">
                    <input type="text" placeholder="Email" className="border p-0.5 bg-slate-100" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-0.5 bg-slate-100"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-0.5 bg-slate-100"
                    />
                    <button type="submit" className="bg-sky-500 text-white rounded-sm p-1">
                        Sign up
                    </button>
                    <div></div>
                </form>
            </div>
            <div className="border border-black-2 flex items-center justify-center py-4 px-8 mt-2">
                <p>
                    Have an account?{' '}
                    <Link to={'/sigin'}>
                        <span className="text-sky-500">Sign in</span>
                    </Link>
                </p>
            </div>
        </>
    );
}
