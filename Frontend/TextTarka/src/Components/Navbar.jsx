import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [loginUser, setLoginUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const logoutHandler = (e) => {
        // Remove user information from local storage
        e.preventDefault();
        localStorage.removeItem('user');
        setLoginUser(null);
        navigate('/landing');
    };

    return (
        <nav className="d-flex justify-content-between navbar navbar-light bg-light">
            <div>
                <Link className="btn btn-sm me-2" to={'/'}>
                    TextTarka
                </Link>
            </div>
            <div>
                {loginUser ? (
                    <>
                        <span className="me-2">Welcome, {loginUser.username}</span>
                        <Link onClick={logoutHandler} className="btn btn-outline-success me-2">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-outline-success me-2" to={'/login'}>
                            Login
                        </Link>
                        <Link className="btn btn-outline-success me-2" to={'/signup'}>
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
