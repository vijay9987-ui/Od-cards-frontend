import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import loginpng from '../assets/login.png';

function Home() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [centerIndex, setCenterIndex] = useState(2);
    const [errors, setErrors] = useState({
        mobile: "",
        otp: "",
        name: "",
        email: "",
        location: "",
        terms: ""
    });
    const [user, setUser] = useState(null);
    const [generatedOTP, setGeneratedOTP] = useState("");
    const loginModalRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://od-cards-backend.onrender.com/api/categories/allcategories');
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.categories);
                } else {
                    setCategoryError(data.message || 'Failed to fetch categories');
                }
            } catch (error) {
                setCategoryError('Network error while fetching categories');
                console.error('Category fetch error:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // Timer effect for OTP resend
    useEffect(() => {
        let interval;
        if (timer > 0 && resendDisabled) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, resendDisabled]);

    // Auto-slide carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            slide("next");
        }, 3000);
        return () => clearInterval(interval);
    }, [centerIndex]);

    // Check for existing session on component mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Redirect to dashboard if user is logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const products = [
        {
            id: 1,
            name: "Business Card - Abstract Design",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            description: "A sleek and creative business card design with a modern abstract polygon style.",
            price: 20.00,
            category: "Business Cards"
        },
        {
            id: 2,
            name: "Classic Business Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            description: "A timeless and professional business card design.",
            price: 15.00,
            category: "Business Cards"
        },
        {
            id: 3,
            name: "Category Icon Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
            description: "A business card design featuring a category icon for easy identification.",
            price: 18.00,
            category: "Business Cards"
        },
        {
            id: 4,
            name: "Cards Collection",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
            description: "A set of various business card designs, perfect for different industries.",
            price: 50.00,
            category: "Business Cards"
        },
        {
            id: 5,
            name: "Wedding Invitation Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            description: "Elegant and romantic wedding invitation card design.",
            price: 30.00,
            category: "Wedding Cards"
        }
    ];

    const freeCards = [
        {
            id: 'free-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            name: "Floral Wedding Invitation",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            name: "Elegant Wedding Card",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
            name: "Modern Wedding Invitation",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
            name: "Romantic Wedding Card",
            price: "Free",
            category: "free"
        }
    ];

    const premiumCards = [
        {
            id: 'premium-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44892.jpg",
            name: "Luxury Wedding Card",
            price: "$10",
            category: "premium"
        },
        {
            id: 'premium-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg",
            name: "Classic Premium Card",
            price: "$12",
            category: "premium"
        },
        {
            id: 'premium-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44894.jpg",
            name: "Modern Premium Invitation",
            price: "$15",
            category: "premium"
        },
        {
            id: 'premium-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            name: "Exquisite Wedding Card",
            price: "$18",
            category: "premium"
        }
    ];

    const offers = [
        { id: 1, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 2, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 3, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 4, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
    ];

    const bestsellers = [
        { id: 1, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 2, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 3, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
        { id: 4, image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" },
    ];

    // Carousel functions
    const slide = (direction) => {
        if (direction === "next") {
            setCenterIndex((prev) => (prev + 1) % products.length);
        } else {
            setCenterIndex((prev) => (prev - 1 + products.length) % products.length);
        }
    };

    const getImageClass = (offset) => {
        if (offset === 0) return "carousel-img center";
        if (offset === -1 || offset === 1) return "carousel-img medium";
        return "carousel-img small";
    };

    // Modal functions
    const loginModal = () => {
        if (loginModalRef.current) {
            const modal = new window.bootstrap.Modal(loginModalRef.current);
            modal.show();
            resetForm();
        }
    };

    const resetForm = () => {
        setStep(1);
        setMobileNumber("");
        setOtp(["", "", "", ""]);
        setName("");
        setEmail("");
        setLocation("");
        setErrors({
            mobile: "",
            otp: "",
            name: "",
            email: "",
            location: "",
            terms: ""
        });
    };

    // OTP functions
    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const handleRequestOTP = (e) => {
        e.preventDefault();
        if (validateMobile() && termsAccepted) {
            const otp = generateOTP();
            setGeneratedOTP(otp);
            console.log(`Demo OTP: ${otp}`);
            alert(`Your Demo OTP: ${otp}`);
            setStep(2);
            setTimer(30);
            setResendDisabled(true);
        }
    };

    const handleResendOTP = () => {
        const newOTP = generateOTP();
        setGeneratedOTP(newOTP);
        console.log(`New Demo OTP: ${newOTP}`);
        alert(`Your Demo OTP: ${newOTP}`);
        setTimer(30);
        setResendDisabled(true);
        setOtp(["", "", "", ""]);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join("");

        if (!enteredOTP) {
            setErrors({ ...errors, otp: "OTP is required" });
            return;
        }

        if (enteredOTP.length !== 4) {
            setErrors({ ...errors, otp: "Enter a valid 4-digit OTP" });
            return;
        }

        if (enteredOTP === generatedOTP) {
            setErrors({ ...errors, otp: "" });
            setStep(3);
        } else {
            setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
        }
    };

    // Validation functions
    const validateMobile = () => {
        if (!mobileNumber) {
            setErrors({ ...errors, mobile: "Mobile number is required" });
            return false;
        }
        if (mobileNumber.length !== 10) {
            setErrors({ ...errors, mobile: "Enter a valid 10-digit mobile number" });
            return false;
        }
        setErrors({ ...errors, mobile: "" });
        return true;
    };

    const validateSignUp = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!name) {
            newErrors.name = "Name is required";
            valid = false;
        } else {
            newErrors.name = "";
        }

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
            valid = false;
        } else {
            newErrors.email = "";
        }

        if (!location) {
            newErrors.location = "Location is required";
            valid = false;
        } else {
            newErrors.location = "";
        }

        setErrors(newErrors);
        return valid;
    };

    // API functions
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateSignUp()) return;

        try {
            const response = await fetch('https://od-cards-backend.onrender.com/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile: mobileNumber,
                    location
                }),
            });

            const data = await response.json();
            console.log("Full signup response:", data); // ✅

            if (!response.ok && response.status !== 200) {
                throw new Error(data.message || 'Registration failed');
            }


            sessionStorage.setItem('user', JSON.stringify({
                userId: data.user._id,
                Name: data.user.name,
                Mobile: data.user.mobile
            }));
            setUser(data.user);

            const modal = bootstrap.Modal.getInstance(loginModalRef.current);
            modal.hide();

            navigate('/dashboard');


        } catch (error) {
            setErrors(prev => ({
                ...prev,
                form: error.message
            }));
            console.error('Registration error:', error);
        }
    };

    // UI handlers
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handleImageClick = () => {
        alert('Clicked New Arrival Product!!!!');
    };

    const handleNewArrivals = () => {
        alert('Clicked on New Arrivals Page!!!');
    };

    return (
        <>
            <Navbar user={user} onLogin={loginModal} onLogout={handleLogout} />

            <div className="container-fluid w-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-sm-6 p-3">
                        <h1><b>Find The Best Frame For Treasured Moments.</b></h1><br />
                        <p>Elevate your brand with premium card printing—custom designs, high-quality materials, and cutting-edge technology tailored to your needs.From offset to digital, we choose the ideal technique based on time, color, quantity, and finish for perfect, vibrant results every time.</p><br />
                        <button className="btn btn-dark btn-lg" style={{
                            background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                            color: 'white'
                        }}
                            onClick={loginModal}>Login</button>
                    </div>
                    <div className="col-sm-6 p-5">
                        <div id="weddingCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner rounded-5">
                                <div className="carousel-item active">
                                    <img
                                        src="https://img.freepik.com/free-vector/gradient-golden-floral-wedding-invitation_52683-60511.jpg"
                                        className="d-block w-100"
                                        alt="Slide 1"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg"
                                        className="d-block w-100"
                                        alt="Slide 2"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg"
                                        className="d-block w-100"
                                        alt="Slide 3"
                                    />
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#weddingCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#weddingCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="scroll-wrapper rounded mt-2 p-2 ">
                    <div className="scroll-content">
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Visiting Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Wedding Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Invitation Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Visiting Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Wedding Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Invitation Cards</p>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Explore All Categories</h2>
                    </div>
                </div>
                <br />
                {loadingCategories ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : categoryError ? (
                    <div className="alert alert-danger">{categoryError}</div>
                ) : (
                    <div className="row g-4">
                        {categories.map((category) => (
                            <div key={category._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card text-bg-dark" onClick={loginModal}>
                                    <img
                                        style={{
                                            filter: "blur(2px)",
                                            objectFit: "cover",
                                            height: "300px", // Ensure consistent height
                                            width: "100%"
                                        }}
                                        src={category.image || "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg"}
                                        className="card-img img-fluid"
                                        alt={category.category}
                                        onError={(e) => {
                                            e.target.src = "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg";
                                        }}
                                    />
                                    <div className="card-img-overlay d-flex justify-content-center align-items-center">
                                        <h5 className="card-title text2" style={{ cursor: "pointer" }}>
                                            {category.category}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* New Arrival */}
            <div className="container carousel-container">
                <h2 className="mb-4" style={{ cursor: "pointer" }} onClick={handleNewArrivals}>New Arrivals</h2>
                <div className="carousel-wrapper">
                    {[-2, -1, 0, 1, 2].map((offset) => {
                        const index = (centerIndex + offset + products.length) % products.length;
                        const product = products[index];
                        return (
                            <div
                                key={product.id}
                                className={`carousel-product ${getImageClass(offset)}`}
                                onClick={offset === 0 ? () => handleImageClick(product.id) : undefined}
                                style={{ cursor: offset === 0 ? "pointer" : "default" }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                {offset === 0 && (
                                    <div className="product-info">
                                        <h5>{product.name}</h5>
                                        <p className="text-primary">${product.price.toFixed(2)}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="carousel-controls text-center">
                    <button onClick={() => slide("prev")} className="btn" style={{ background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: "white" }}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={() => slide("next")} className="btn" style={{ background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: "white" }}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>

            {/* Free Cards */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Free Wedding Cards</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {freeCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={loginModal}>
                            <div className="card position-relative border-0 shadow-sm free-card" style={{ overflow: 'hidden' }}>
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="text-success fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Cards */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Premium Wedding Cards</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {premiumCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={loginModal}>
                            <div className="card position-relative border-0 premium-card" style={{ overflow: 'hidden', background: '#1e1e1e' }}>
                                <div className="premium-ribbon">Premium</div>
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3 text-white">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="text-warning fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Offers */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Offers</h2>
                    </div>
                    <div className="col-12 col-md-4 text-center"></div>
                </div>
                <br />
                <div className="row g-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card text-bg-dark position-relative">
                                <img
                                    src={offer.image}
                                    className="card-img img-fluid freecards"
                                    alt="Offer Image"
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="info-icon position-absolute top-50 start-50 translate-middle">
                                    <div className="icon-style">
                                        <i className="fa-solid fa-arrow-up-right-from-square fa-2xl" onClick={loginModal} style={{ color: "#ffffff", cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Sellers */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Best Sellers</h2>
                    </div>
                    <div className="col-12 col-md-4 text-center"></div>
                </div>
                <br />
                <div className="row g-4">
                    {bestsellers.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card text-bg-dark position-relative">
                                <img
                                    src={card.image}
                                    className="card-img img-fluid freecards"
                                    alt="Wedding Card"
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="info-icon position-absolute top-50 start-50 translate-middle">
                                    <div className="icon-style">
                                        <i className="fa-solid fa-arrow-up-right-from-square fa-2xl" onClick={loginModal} style={{ color: "#ffffff", cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Login Modal */}
            <div className="modal fade" id="loginModal" ref={loginModalRef} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}>
                        {/* SIGN-IN FORM */}
                        {step === 1 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Login</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="Login" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ backgroundColor: "Transparent" }}>
                                        <form className="w-75" onSubmit={handleRequestOTP}>
                                            <label htmlFor="mobile" className="form-label">Enter Your Mobile Number</label>
                                            <input
                                                type="tel"
                                                className="form-control mb-3 w-100"
                                                placeholder="Mobile"
                                                name="mobile"
                                                maxLength={10}
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                required
                                            />
                                            {errors.mobile && <div className="text-danger mb-3">{errors.mobile}</div>}

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Request OTP
                                            </button>
                                            <br />
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsCheckbox"
                                                    checked={termsAccepted}
                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="termsCheckbox">
                                                    By continuing, you agree to OD Card's <a href="#" target="_blank">Terms & Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* OTP VERIFICATION */}
                        {step === 2 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Verify OTP</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="OTP Verification" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ background: 'transparent' }}>
                                        <form className="w-75" onSubmit={handleVerifyOTP}>
                                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                                            <div className="d-flex justify-content-between mb-3">
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        className="form-control text-center mx-1"
                                                        style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(index, e)}
                                                        required
                                                    />
                                                ))}
                                            </div>
                                            {errors.otp && <div className="text-danger mb-3">{errors.otp}</div>}

                                            <div className="mb-3">
                                                {resendDisabled ? (
                                                    <span>Resend OTP in {timer} seconds</span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-link"
                                                        onClick={handleResendOTP}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                )}
                                            </div>

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Verify OTP
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SIGN-UP FORM */}
                        {step === 3 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Sign Up</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="Sign Up" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ background: 'transparent' }}>
                                        <form className="w-75" onSubmit={handleSignUp}>
                                            <label htmlFor="signup" className="form-label">Enter Your Details</label>
                                            <input
                                                type="text"
                                                className="form-control mb-3 w-100"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="text-danger mb-3">{errors.name}</div>}

                                            <input
                                                type="email"
                                                className="form-control mb-3 w-100"
                                                placeholder="Email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {errors.email && <div className="text-danger mb-3">{errors.email}</div>}

                                            <input
                                                type="tel"
                                                className="form-control mb-3 w-100"
                                                placeholder="Mobile Number"
                                                name="mobile"
                                                value={mobileNumber}
                                                readOnly
                                                maxLength={10}
                                                required
                                            />

                                            <select
                                                className="form-select mb-3 w-100"
                                                name="location"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Location</option>
                                                <option value="hyderabad">Hyderabad</option>
                                                <option value="bengaluru">Bengaluru</option>
                                                <option value="chennai">Chennai</option>
                                            </select>
                                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;