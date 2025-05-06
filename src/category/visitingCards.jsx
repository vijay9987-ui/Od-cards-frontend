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

  const sizes = [1, 2, 4, 5, 6, 8, 12, 16];
  const gsmOptions = [
    { type: "80 Art", price: 1550 },
    { type: "90 Art", price: 1670 },
    { type: "100 Art", price: 1850 },
    { type: "120 Art", price: 2150 },
    { type: "130 Art", price: 2300 },
    { type: "170 Art", price: 3050 },
    { type: "100 Mapli", price: 1200 }
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedGSM, setSelectedGSM] = useState(gsmOptions[0]);

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
        category: categories.find(cat => cat.id === selectedCategoryId)?.name,
        selectedSize,
        selectedGSM,
        totalPrice: calculatePrice()
      }
    });
  };

  const calculatePrice = () => {
    if (!selectedGSM) return 0;
    return selectedGSM.price * selectedSize;
  };

  const currentCard = products.find(p => p.categoryId === selectedCategoryId);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Visiting Cards</h2>

        <div className="row">
          {/* Category Column */}
          <div className="col-12 col-md-4 mb-4">
            <div className="d-flex flex-column gap-2">
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
          </div>

          {/* Card Details Column */}
          <div className="col-12 col-md-8">
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
                  <ul className="list-unstyled mb-3">
                    <li><strong>Description:</strong> {currentCard.description}</li>
                    <li><strong>Size:</strong> {currentCard.size}</li>
                    <li><strong>Finish:</strong> {currentCard.finish}</li>
                    <li><strong>Material:</strong> {currentCard.material}</li>
                  </ul>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Select Paper Cutting Size</label>
                    <select
                      className="form-select"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(parseInt(e.target.value))}
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Select GSM</label>
                    <select
                      className="form-select"
                      value={selectedGSM.type}
                      onChange={(e) => {
                        const gsm = gsmOptions.find(g => g.type === e.target.value);
                        setSelectedGSM(gsm);
                      }}
                    >
                      {gsmOptions.map(gsm => (
                        <option key={gsm.type} value={gsm.type}>{gsm.type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <h5>Total Price: ₹{calculatePrice()}</h5>
                  </div>

                  <button
                    className="btn btn-lg w-100"
                    onClick={() => handleCardClick(currentCard)}
                    style={{ background: "linear-gradient(to right, #F8483C, #DE2B59 )" }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}
          </div>
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
};

export default VisitingCards;
