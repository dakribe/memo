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
        <div>
            <form>
                <input type="text" />
                <input type="text" />
                <input type="password" />
                <button>Sign up</button>
            </form>
        </div>
    );
}
