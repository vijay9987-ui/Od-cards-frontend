import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from './com-assets/odcards-logo.png';

function Navbar({ user, onLogout, onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const loginModalRef = useRef(null);

    const [sessionUser, setSessionUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                setSessionUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Invalid user in sessionStorage", e);
            }
        }
    }, []);

    const isUserLoggedIn = user || sessionUser;

    const handleLoginClick = () => {
        if (onLogin) {
            onLogin();
        } else if (loginModalRef.current) {
            const modal = new window.bootstrap.Modal(loginModalRef.current);
            modal.show();
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user"); // Clear session storage
        setSessionUser(null);              // Update local state
        if (onLogout) onLogout();          // Call parent logout logic
        navigate('/');                     // Redirect after logout
    }

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                {/* Navbar Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logo */}
                <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
                    <img src={logo} alt="OdCards" style={{ height: '40px', cursor: 'pointer' }} />
                </div>

                {/* Navbar Content */}
                <div className='collapse navbar-collapse' id="navbarNav">
                    <ul className="navbar-nav mx-auto gap-3">
                        <li className="nav-item">
                            <Link
                                className={`nav-link fs-5 ${location.pathname === "/dashboard" ? "active" : ""}`}
                                to="/dashboard"
                                style={{
                                    color: location.pathname === "/dashboard" ? "#DE2B59" : "#000",
                                    fontWeight: location.pathname === "/dashboard" ? "600" : "400"
                                }}
                            >
                                Home
                            </Link>
                        </li>

                        {/* Enhanced Dropdown */}
                        <li className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}>
                            <a
                                className={`nav-link dropdown-toggle fs-5 ${["/dashboard/contactus", "/dashboard/faqpage", "/dashboard/aboutus"].includes(location.pathname) ? "active" : ""}`}
                                href="#"
                                id="infoDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded={dropdownOpen}
                                onClick={toggleDropdown}
                                style={{
                                    color: ["/dashboard/contactus", "/dashboard/faqpage", "/dashboard/aboutus"].includes(location.pathname) ? "#DE2B59" : "#000",
                                    fontWeight: ["/dashboard/contactus", "/dashboard/faqpage", "/dashboard/aboutus"].includes(location.pathname) ? "600" : "400"
                                }}
                            >
                                Info
                            </a>
                            <ul
                                className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                                aria-labelledby="infoDropdown"
                                style={{
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    padding: '0.5rem 0',
                                    minWidth: '200px'
                                }}
                            >
                                <li>
                                    <Link
                                        className={`dropdown-item d-flex align-items-center ${location.pathname === "/dashboard/contactus" ? "active-dropdown-item" : ""}`}
                                        to="/dashboard/contactus"
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            color: location.pathname === "/dashboard/contactus" ? "#DE2B59" : "#333",
                                            fontWeight: location.pathname === "/dashboard/contactus" ? "600" : "400",
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="fas fa-envelope me-2"></i>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`dropdown-item d-flex align-items-center ${location.pathname === "/dashboard/faqpage" ? "active-dropdown-item" : ""}`}
                                        to="/dashboard/faqpage"
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            color: location.pathname === "/dashboard/faqpage" ? "#DE2B59" : "#333",
                                            fontWeight: location.pathname === "/dashboard/faqpage" ? "600" : "400",
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="fas fa-question-circle me-2"></i>
                                        FAQ'S
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`dropdown-item d-flex align-items-center ${location.pathname === "/dashboard/aboutus" ? "active-dropdown-item" : ""}`}
                                        to="/dashboard/aboutus"
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            color: location.pathname === "/dashboard/aboutus" ? "#DE2B59" : "#333",
                                            fontWeight: location.pathname === "/dashboard/aboutus" ? "600" : "400",
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="fas fa-info-circle me-2"></i>
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link fs-5 text-dark">
                                Products
                            </button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to="">
                                Orders
                            </Link>
                        </li>
                    </ul>

                    {/* Right-aligned Icons */}
                    <div className="d-flex align-items-center ms-auto">
                        {isUserLoggedIn ? (
                            <>
                                <button
                                    className="btn btn-link text-dark mx-2 position-relative"
                                    onClick={() => navigate('/dashboard/mycart')}
                                >
                                    <i
                                        className="fa fa-shopping-cart fa-lg"
                                        style={{
                                            color: location.pathname === "/dashboard/mycart" ? "#DE2B59" : "#000"
                                        }}
                                    ></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {/* 3 */}
                                    </span>
                                </button>
                                <button
                                    className="btn btn-link text-dark mx-2"
                                    onClick={() => navigate('/dashboard/profile')}
                                >
                                    <i
                                        className="fa-solid fa-user fa-lg"
                                        style={{
                                            color: location.pathname === "/dashboard/profile" ? "#DE2B59" : "#000"
                                        }}
                                    ></i>
                                </button>
                                <button
                                    className="btn btn-link text-dark mx-2"
                                    onClick={handleLogout}
                                >
                                    <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                                </button>

                            </>
                        ) : (
                            <button
                                className="btn btn-danger ms-2"
                                onClick={handleLoginClick}
                                style={{
                                    background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                    border: 'none',
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    fontWeight: '500'
                                }}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;