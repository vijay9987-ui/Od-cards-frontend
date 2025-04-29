import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderModal from "../pages/orderModal";
import { useNavigate } from "react-router-dom";

const VisitingCards = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: "One Side Trump Visiting Cards" },
        { id: 2, name: "Double Side Trump Visiting Cards" },
        { id: 3, name: "Premium Embossed Cards" },
        { id: 4, name: "Eco-Friendly Cards" }
    ];

    const products = [
        {
            id: 1,
            categoryId: 1,
            image: "https://img.freepik.com/free-vector/modern-blue-color-wave-style-business-card-design-vector_1055-11467.jpg",
            description: "Standard one-sided visiting card with glossy finish",
            size: "3.5 x 2 inches",
            finish: "Glossy",
            material: "300 GSM Card Stock"
        },
        {
            id: 3,
            categoryId: 2,
            image: "https://img.freepik.com/free-vector/minimalist-white-business-card_1055-10831.jpg",
            description: "Double-sided premium card with spot UV coating",
            size: "3.5 x 2 inches",
            finish: "Matte with Spot UV",
            material: "350 GSM Premium Stock"
        },
        {
            id: 5,
            categoryId: 3,
            image: "https://img.freepik.com/free-vector/luxury-gold-business-card_1055-10833.jpg",
            description: "Embossed premium card with gold foil detailing",
            size: "3.5 x 2 inches",
            finish: "Gold Foil + Embossed",
            material: "Luxe Textured Paper"
        },
        {
            id: 7,
            categoryId: 4,
            image: "https://img.freepik.com/free-vector/eco-friendly-business-card_1055-10835.jpg",
            description: "Recycled paper card with natural texture",
            size: "3.5 x 2 inches",
            finish: "Matte",
            material: "100% Recycled Kraft Paper"
        }
    ];

    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProceed = (quantity) => {
        navigate('/dashboard/card-details', {
            state: {
                quantity,
                card: selectedCard,
                category: categories.find(cat => cat.id === selectedCategoryId)?.name
            }
        });
    };

    const currentCard = products.find(p => p.categoryId === selectedCategoryId);

    return (
        <>
            <Navbar />

            <div className="container my-5">
                <h2 className="text-center fw-bold mb-4">Visiting Cards</h2>

                {/* Category Selector */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategoryId(category.id)}
                            className={`btn px-4 py-2 rounded-pill fw-semibold ${selectedCategoryId === category.id ? 'text-white' : 'text-danger'}`}
                            style={{
                                background: selectedCategoryId === category.id
                                    ? "linear-gradient(to right, #DF2C58, #FF688D)"
                                    : "transparent",
                                border: selectedCategoryId === category.id
                                    ? "none"
                                    : "1px solid #DF2C58"
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Selected Card Details */}
                {currentCard && (
                    <div className="row align-items-center justify-content-center g-4">
                        <div className="col-12 col-sm-6 col-md-4">
                            <div
                                className="position-relative"
                                onClick={() => handleCardClick(currentCard)}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={currentCard.image}
                                    className="img-fluid rounded shadow-lg"
                                    alt={currentCard.description}
                                    style={{
                                        maxWidth: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
                            <h5 className="fw-bold mb-3 text-danger">{categories.find(c => c.id === selectedCategoryId)?.name}</h5>
                            <ul className="list-unstyled">
                                <li><strong>Description:</strong> {currentCard.description}</li>
                                <li><strong>Size:</strong> {currentCard.size}</li>
                                <li><strong>Finish:</strong> {currentCard.finish}</li>
                                <li><strong>Material:</strong> {currentCard.material}</li>
                            </ul>
                            <button
                                className="btn btn-lg mt-3 w-100"
                                onClick={() => handleCardClick(currentCard)}
                                style={{ background: "linear-gradient(to right, #F8483C, #DE2B59 )" }}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <OrderModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onProceed={handleProceed}
            />

            <Footer />
        </>
    );
};

export default VisitingCards;
