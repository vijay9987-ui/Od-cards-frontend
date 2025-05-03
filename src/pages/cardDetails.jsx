import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quantity, card } = location.state || {};

  const defaultCard = {
    id: 0,
    image: "https://img.freepik.com/free-vector/modern-blue-color-wave-style-business-card-design-vector_1055-11467.jpg",
    description: "Default Card Description",
    categoryId: 1,
  };

  const selectedCard = card || defaultCard;
  const [uploads, setUploads] = useState(Array(quantity || 1).fill(null));

  const handleFileChange = (index, e) => {
    const newUploads = [...uploads];
    newUploads[index] = e.target.files[0];
    setUploads(newUploads);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/mycart", {
      state: {
        newItem: {
          id: selectedCard.id,
          title: selectedCard.description || "Custom Invitation Card",
          image: selectedCard.image,
          price: "20",
          quantity: quantity || 1,
          uploads: uploads.filter((upload) => upload !== null),
        },
      },
    });
  };

  const handleAddToCart = (index) => {
    const item = {
      id: selectedCard.id,
      title: selectedCard.description || "Custom Card",
      image: selectedCard.image,
      price: "20",
      upload: uploads[index],
    };
    console.log("Item added to cart:", item);
    // Optional: you can push this item to local storage or API
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4">Card Details</h2>
        <div className="row">
          <div className="col-12 col-md-6 mb-4">
            <div className="card mb-4">
              <div className="card-body">
                <img
                  src={selectedCard.image}
                  alt={`Selected Card - ${selectedCard.description}`}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
                <p className="card-text">Quantity: {quantity || 1}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <h5>Description:</h5>
            <p className="card-title">{selectedCard.description}</p>
            <p className="card-title">{selectedCard.size}</p>
            <p className="card-title">{selectedCard.finish}</p>
            <p className="card-title">{selectedCard.material}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h4 className="mb-4 fw-bold text-center">🎨 Upload Your Designs</h4>

          <div className="row g-4">
            {Array.from({ length: quantity || 1 }).map((_, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-header bg-light d-flex align-items-center justify-content-between">
                    <span className="fw-semibold">
                      <i className="fa fa-upload text-danger me-2 fs-5"></i>
                      Design Upload #{index + 1}
                    </span>
                    <select className="form-select form-select-sm w-auto" defaultValue="1">
                      {[100, 200, 300, 400, 500, 1000, 2000].map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor={`file-upload-${index}`} className="form-label w-100">
                        <span
                          className="btn btn-outline-primary w-100"
                          style={{ cursor: "pointer" }}
                        >
                          Upload Design File
                        </span>
                        <input
                          type="file"
                          id={`file-upload-${index}`}
                          style={{ display: "none" }}
                          onChange={(e) => handleFileChange(index, e)}
                          required
                          accept="image/*,.pdf,.psd,.ai"
                        />
                      </label>
                      {uploads[index] && (
                        <div className="small text-success mt-1">
                          {uploads[index].name}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor={`notes-${index}`} className="form-label">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        className="form-control"
                        id={`notes-${index}`}
                        rows="3"
                        placeholder="Any notes or preferences for this design..."
                        style={{ backgroundColor: "#f8f9fa" }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <button
                      type="button"
                      className="btn text-white"
                      style={{ background: "linear-gradient(to right, #DF2C58, #FF688D)" }}
                      onClick={() => handleAddToCart(index)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-4 py-2">
              Submit Order
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CardDetails;
