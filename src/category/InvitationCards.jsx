import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 8;

const InvitationCards = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitationCards = async () => {
      try {
        const response = await fetch("https://od-cards-backend.onrender.com/api/products/getallinvitaioncards");
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Failed to fetch invitation cards");
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
  
        const data = await response.json();
        console.log("Fetched Data:", data);  // Log the data received from the API
  
        // Check the structure of the response
        if (data && data.products && data.products.length > 0) {
          setCards(data.products);  // Make sure the key is 'products' here
        } else {
          setCards([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInvitationCards();
  }, []);
  

    

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading invitation cards...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cards.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            There are currently no invitation cards available.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4">Invitation Cards</h2>

        <div className="row g-4">
          {currentCards.map((card) => (
            <div key={card._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden"
                onClick={() => navigate(`/dashboard/category/invitation-cards/${card._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div className="ratio ratio-4x3">
                  <img
                    src={card.images?.[0] || "https://via.placeholder.com/300x225?text=Invitation+Card"}
                    className="card-img-top object-fit-cover"
                    alt={card.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x225?text=Invitation+Card";
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{card.name}</h5>
                  <div className="d-flex align-items-center mb-2">
                    {card.offeredPrice && card.offeredPrice < card.price ? (
                      <>
                        <span className="text-success fw-bold me-2">${card.offeredPrice}</span>
                        <span className="text-muted text-decoration-line-through small">${card.price}</span>
                      </>
                    ) : (
                      <span className="text-success fw-bold">
                        {card.price === 0 || card.price === "0" ? "Free" : `$${card.price}`}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <span className={`badge ${card.isInStock ? 'bg-success' : 'bg-danger'}`}>
                      {card.isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {card.quantity && (
                      <span className="badge bg-info ms-2">Qty: {card.quantity}</span>
                    )}
                  </div>
                  <p
                    className="card-text text-muted small flex-grow-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {card.description || "No description available"}
                  </p>
                  <button
                    className="btn btn-primary w-100 mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/category/invitation-cards/${card._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <li
                  key={number}
                  className={`page-item ${currentPage === number ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next &raquo;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InvitationCards;
