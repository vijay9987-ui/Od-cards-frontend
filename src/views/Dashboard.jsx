import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderModal from "../pages/orderModal";

function Dashboard() {
    const navigate = useNavigate();

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

    const [centerIndex, setCenterIndex] = useState(2);


    useEffect(() => {
        const interval = setInterval(() => {
            slide("next");
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clear on unmount
    }, []);

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
        { id: 1, image: "src/assets/wedcard.jpg" },
        { id: 2, image: "src/assets/wedcard.jpg" },
        { id: 3, image: "src/assets/wedcard.jpg" },
        { id: 4, image: "src/assets/wedcard.jpg" },
    ];

    const bestsellers = [
        { id: 1, image: "src/assets/wedcard.jpg" },
        { id: 2, image: "src/assets/wedcard.jpg" },
        { id: 3, image: "src/assets/wedcard.jpg" },
        { id: 4, image: "src/assets/wedcard.jpg" },
    ];

    const handleCategoryClick = (link) => {
        if (link) navigate(link);
    };

    const handleCardClick = (category, id) => {
        navigate(`/dashboard/category/weddingcarddetails/${category}/${id}`);
    };

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProceed = () => {
        navigate('/dashboard/card-details');
    };

    const handleNewArrivals = () => {
        navigate('/dashboard/new-arrivals');
    };

    const handleImageClick = (index) => {
        navigate(`/dashboard/new-arrivals/${index}`);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid w-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-sm-6 p-3">
                        <h1><b>Find The Best Frame For Treasured Moments.</b></h1><br />
                        <p>Elevate your brand with premium card printing—custom designs, high-quality materials, and cutting-edge technology tailored to your needs.From offset to digital, we choose the ideal technique based on time, color, quantity, and finish for perfect, vibrant results every time.</p><br />
                        <button className="btn btn-dark btn-lg" style={{
                            background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                            color: 'white'
                        }}
                        onClick={()=>{navigate('/dashboard/mycart')}}
                        >Order Now</button>

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

                            {/* Controls */}
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
                        {/* Repeated items for looping effect */}
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Visiting Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Wedding Cards</p>
                        <p className="scroll-item"><i className="fa-solid fa-envelope"></i> 60+ Invitation Cards</p>

                        {/* Repeat the content to create a seamless loop */}
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
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Category</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {[
                        { title: "Wedding Cards", imgSrc: "src/assets/category.png", link: "/dashboard/category/weddingcards" },
                        { title: "Readymade Wedding Cards", imgSrc: "src/assets/category.png", link: "/dashboard/category/readymadecards" },
                        { title: "Visiting Cards", imgSrc: "src/assets/category.png", link: "/dashboard/category/visiting-cards" },
                        { title: "Invitation Cards", imgSrc: "src/assets/category.png", link: "/dashboard/category/invitation-cards" }
                    ].map((category, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card text-bg-dark" onClick={() => handleCategoryClick(category.link)}>
                                <img style={{ filter: "blur(2px)", height: "100%", objectFit: "cover" }}
                                    src={category.imgSrc} className="card-img img-fluid" alt={category.title} />
                                <div className="card-img-overlay d-flex justify-content-center align-items-center">
                                    <h5 className="card-title text2" style={{ cursor: "pointer" }} >{category.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                    <button onClick={() => slide("prev")} className="btn" style={{background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: "white"}}><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={() => slide("next")} className="btn" style={{background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: "white"}}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>

            {/* Free Cards */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4">Free Wedding Cards</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {freeCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => handleCardClick(card.category, card.id)}>
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
                        <h3 className="mb-4" >Premium Wedding Cards</h3>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {premiumCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => handleCardClick(card.category, card.id)}>
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
                        <h3 className="mb-4">Offers</h3>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card text-bg-dark position-relative">
                                <img
                                    src={offer.image}
                                    className="card-img img-fluid offer-cards"
                                    alt="Offer Image"
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="info-icon position-absolute top-50 start-50 translate-middle">
                                    <div className="icon-style">
                                        <i className="fa-solid fa-arrow-up-right-from-square fa-2xl" style={{ color: "#ffffff", cursor: "pointer" }}></i>
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
                        <h3 className="mb-4">Best Sellers</h3>
                    </div>
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
                                        <i className="fa-solid fa-arrow-up-right-from-square fa-2xl" style={{ color: "#ffffff", cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <OrderModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onProceed={handleProceed}
            />
            <Footer />
        </>
    );
}

export default Dashboard;