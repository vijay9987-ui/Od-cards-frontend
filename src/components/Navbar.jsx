import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
                        <img src="https://s3-alpha-sig.figma.com/img/6136/6658/c55043b8ddcd5eceb360744dcafed79e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BZ6A8kotDbd6Ncn83xyU~GlsphoxrDeE5HCckDjeg-ZNuzeJWtZsLW~YIp8uR3UACVfyFmTmcTlrMLxIqwXn5efU20m5dGPE8C8w9HHGZlZx~UsF-Srnqj5TmOIqwQSlYPi7ZDGliR6jDHHdhVUhmuB55~HbeqF6n~UyL6EQw73xHUPaztzphnO8q8SZu3L-Bd8hXJw-aRJrRXcqZi8fVXUeF~8NkOfGbbR-WsXSa7dRvEvdDIzLVpJmZXqO6Cs~ssCW9SAR7L91B3GCsPnoZj1x2LlVAUewX6kzgNZgw1mFwZPgtKYheHd1uezmuiNA4BzqI1As~WUCa7EeFGTu8w__" 
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
