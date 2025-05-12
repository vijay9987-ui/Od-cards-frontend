import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderModal from "../pages/orderModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VisitingCards = () => {
  const navigate = useNavigate();

  const sizes = [1, 2, 4, 5, 6, 8, 12, 16];
  const gsmOptions = [
    { type: "80 Art", price: 1550 },
    { type: "90 Art", price: 1670 },
    { type: "100 Art", price: 1850 },
    { type: "120 Art", price: 2150 },
    { type: "130 Art", price: 2300 },
    { type: "170 Art", price: 3050 },
    { type: "100 Mapli", price: 1200 },
  ];

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedGSM, setSelectedGSM] = useState(gsmOptions[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisitingCardProducts();
  }, []);

  const fetchVisitingCardProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products/visiting-cards");

      if (res.data.success && res.data.products) {
        setProducts(res.data.products);

        const uniqueSubCategories = [
          ...new Set(res.data.products.map((p) => p.subCategory).filter(Boolean)),
        ];

        setSubCategories(uniqueSubCategories);
        setSelectedSubCategory(uniqueSubCategories[0] || null);
      } else {
        setError("No products found");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching visiting card products:", error);
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProceed = (quantity) => {
    navigate("/dashboard/card-details", {
      state: {
        quantity,
        card: selectedCard,
        category: "Visiting Cards",
        subCategory: selectedSubCategory,
        selectedSize,
        selectedGSM,
        totalPrice: calculatePrice(),
      },
    });
  };

  const calculatePrice = () => {
    if (!selectedGSM) return 0;
    return selectedGSM.price * selectedSize;
  };

  const filteredCards = products.filter((p) => p.subCategory === selectedSubCategory);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5 fs-5">
        {error}
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="alert alert-info text-center my-5 fs-5">
        No visiting cards found.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Visiting Cards</h2>

        <div className="row">
          {/* Subcategory Buttons */}
          <div className="col-12 col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-semibold text-center mb-3 text-danger">SubCategories</h5>
              <div className="d-flex flex-column gap-2">
                {subCategories.map((sub, idx) => {
                  const isActive = selectedSubCategory === sub;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`btn rounded-pill fw-semibold subcategory-btn ${isActive ? "active text-white" : "text-danger"
                        }`}
                      style={{
                        background: isActive
                          ? "linear-gradient(to right, #DF2C58, #FF688D)"
                          : "transparent",
                        borderColor: "#DF2C58",
                      }}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>


          {/* Product Display */}
          <div className="col-12 col-md-8">
            {filteredCards.map((card) => (
              <div className="card mb-4 shadow-sm p-3 border-0" key={card._id}>
                <div className="row align-items-center g-4">
                  <div className="col-12 col-sm-6 col-md-5">
                    <div
                      className="position-relative"
                      onClick={() => handleCardClick(card)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={card.images[0]}
                        className="img-fluid rounded"
                        alt={card.description}
                        style={{
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-7">
                    <h5 className="fw-bold mb-3 text-danger">{card.subCategory}</h5>
                    <ul className="list-unstyled mb-3">
                      <li>
                        <strong>Description:</strong> {card.description}
                      </li>
                      <li>
                        <strong>Size:</strong> 3.5 x 2 inches
                      </li>
                      <li>
                        <strong>Material:</strong> 300–350 GSM (based on selection)
                      </li>
                    </ul>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-secondary">
                        Select Paper Cutting Size
                      </label>
                      <select
                        className="form-select shadow-sm"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(parseInt(e.target.value))}
                      >
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-secondary">
                        Select GSM
                      </label>
                      <select
                        className="form-select shadow-sm"
                        value={selectedGSM.type}
                        onChange={(e) => {
                          const gsm = gsmOptions.find((g) => g.type === e.target.value);
                          setSelectedGSM(gsm);
                        }}
                      >
                        {gsmOptions.map((gsm) => (
                          <option key={gsm.type} value={gsm.type}>
                            {gsm.type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-success">Total Price: ₹{calculatePrice()}</h5>
                    </div>

                    <button
                      className="btn btn-danger btn-lg w-100 mt-3"
                      style={{
                        background: "linear-gradient(to right, #F8483C, #DE2B59)",
                        border: "none",
                      }}
                      onClick={() => handleCardClick(card)}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
