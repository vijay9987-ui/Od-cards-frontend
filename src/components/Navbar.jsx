import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from './com-assets/odcards-logo.png';


function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        navigate('/')
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container">
                    {/* Navbar Toggle Button (for Mobile) */}
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
                    <div>
                        <img src={logo}
                            alt="OdCards" onClick={() => { navigate('/dashboard') }} />
                    </div>

                    {/* Navbar Links */}
                    <div className='collapse navbar-collapse' id="navbarNav">
                        <ul className="navbar-nav mx-auto gap-3">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fs-5  ${location.pathname === "/dashboard" ? "active" : ""}`}
                                    to="/dashboard"
                                    style={{ color: `${location.pathname === "/dashboard" ? "#DE2B59" : "#000"}` }}
                                >
                                    Home
                                </Link>

                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link fs-5 text-dark" style={{ color: `${location.pathname === "/dashboard/faqpage" ? "#DE2B59" : "#000"}` }}>
                                    Products
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link 
                                className="nav-link fs-5 text-dark" 
                                to=""
                                >Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fs-5 ${location.pathname === "/dashboard/contactus" ? "active" : ""}`}
                                    to="/dashboard/contactus"
                                    style={{ color: `${location.pathname === "/dashboard/contactus" ? "#DE2B59" : "#000"}` }}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link fs-5 ${location.pathname === "/dashboard/faqpage" ? "active" : ""}`}
                                    to="/dashboard/faqpage"
                                    style={{ color: `${location.pathname === "/dashboard/faqpage" ? "#DE2B59" : "#000"}` }}
                                >
                                    FAQ'S
                                </Link>
                            </li>
                            <li className="nav-item">
                            <Link
                                    className={`nav-link fs-5 ${location.pathname === "/dashboard/aboutus" ? "active" : ""}`}
                                    to="/dashboard/aboutus"
                                    style={{ color: `${location.pathname === "/dashboard/aboutus" ? "#DE2B59" : "#000"}` }}
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>

                        {/* Icons Section */}
                        <div className="d-flex">
                            <button className="btn" type="button" onClick={() => { navigate('/dashboard/mycart') }}>
                                <i className="fa fa-shopping-cart fa-xl" style={{ color: `${location.pathname === "/dashboard/mycart" ? "#DE2B59" : "#000"}` }}></i>
                            </button>
                            <button className="btn" type="button" onClick={() => { navigate('/dashboard/profile') }}>
                                <i className="fa-solid fa-user fa-xl" style={{ color: `${location.pathname === "/dashboard/profile" ? "#DE2B59" : "#000"}` }}></i>
                            </button>
                            <button className="btn" type="button" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket fa-xl " style={{ color: "#000000" }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
