import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-100 mt-auto bg-color p-4">
            <div className="container flex-row justify-space-between-lg w-100">
                <span>Have any questions or concerns? 
                    <Link to="/Contact" className="p-3" >Contact Us</Link>
                </span>
                <span>&copy;2021 by TCG</span>
            </div>
        </footer>
    )
}

export default Footer
