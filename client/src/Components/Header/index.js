import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <div>
            <div>
                <h1>App Name</h1>
            </div>
            <nav className="text-center">
                {Auth.loggedIn() ? (
                    <>
                        <a href="/" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
            
        </div>
    )
}

export default header
