import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './com-assets/odcards-logo.png';


function Navbar() {

    const navigate = useNavigate();

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
                        alt="OdCards" onClick={()=>{navigate('/dashboard')}}/>
                    </div>

                    {/* Navbar Links */}
                    <div className='collapse navbar-collapse' id="navbarNav">
                        <ul className="navbar-nav mx-auto gap-3">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 text-dark" to="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link fs-5 text-dark">
                                    Products
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 text-dark" to="">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 text-dark" to="/dashboard/contactus">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 text-dark" to="/dashboard/faqpage">FAQ'S</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 text-dark" to="/dashboard/aboutus">About Us</Link>
                            </li>
                        </ul>

                        {/* Icons Section */}
                        <div className="d-flex">
                            <button className="btn" type="button" onClick={()=>{navigate('/dashboard/mycart')}}>
                                <i className="fa fa-shopping-cart fa-xl" style={{ color: "#000000" }}></i>
                            </button>
                            <button className="btn" type="button" onClick={()=>{navigate('/dashboard/profile')}}>
                                <i className="fa-regular fa-user fa-xl" style={{ color: "#000000" }}></i>
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
