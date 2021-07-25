import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
    
    return (
        <header className="bg-color mb-4 py-2 flex-row align-center">
          <div className="container flex-row justify-space-between-lg justify-center align-center">
            <Link to="/">
              <h1>The Community Gallery</h1>
            </Link>
            <nav className="text-center">
              {Auth.loggedIn() ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/gallery">Gallery</Link>
                  <a href="/" onClick={logout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <Link to="/home">Home</Link>
                  <Link to="/gallery">Gallery</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        </header>
    );
};

export default Header
