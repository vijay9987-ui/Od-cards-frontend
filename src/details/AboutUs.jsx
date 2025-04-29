import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="fw-bold mb-4">About Us</h2>

        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/free-photo/opened-wedding-invitation-mockup-with-envelope_23-2148430870.jpg"
              alt="Cards"
              className="img-fluid rounded-circle"
            />
          </div>

          <div className="col-md-6">
            <p><strong>Card Printing:</strong> Make a lasting impression with high-quality cards using premium materials, finishes, and custom designs tailored to you.</p>
            <p><strong>Advanced Technology:</strong> We use the latest printing methods—offset, digital, retransfer, and more—for sharp, vibrant results.</p>
            <p><strong>Global Sourcing:</strong> Country of origin may vary by batch, with printing technique chosen based on time, color, quantity, and finish.</p>
          </div>
        </div>

        <div className="d-flex justify-content-around text-center mt-5 flex-wrap">
          <div>
            <img
              src="https://img.freepik.com/free-vector/modern-business-card-template_23-2147968533.jpg"
              alt="Visiting Cards"
              className="rounded-circle mb-2"
              style={{ width: 100, height: 100 }}
            />
            <p className="fw-bold">60+<br />Visiting Cards</p>
          </div>

          <div>
            <img
              src="https://img.freepik.com/free-vector/flat-wedding-invitation-template_23-2149051104.jpg"
              alt="Wedding Cards"
              className="rounded-circle mb-2"
              style={{ width: 100, height: 100 }}
            />
            <p className="fw-bold">60+<br />Wedding Cards</p>
          </div>

          <div>
            <img
              src="https://img.freepik.com/premium-photo/qr-code-smartphone-screen-with-black-background_902639-20616.jpg"
              alt="QR Cards"
              className="rounded-circle mb-2"
              style={{ width: 100, height: 100 }}
            />
            <p className="fw-bold">60+<br />Invitation Cards</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
