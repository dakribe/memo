import { Link } from 'react-router-dom';

function Root() {
    return (
        <div>
            <h1>home</h1>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
        </div>
    );
}

export default Root;
