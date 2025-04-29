import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "We provide fast on-demand printing",
      answer:
        "Communications det, consec tetur adipiscing elit duis nec fringi communications company. We build and activate brands through cultural insight, str vision, and.",
    },
    {
      question: "What is the purpose of a visiting card?",
      answer:
        "A visiting card provides essential information and contact details to help grow your professional or business network.",
    },
    {
      question: "We provide fast on-demand printing",
      answer:
        "Our print services ensure your products are made and shipped quickly, often within the same day.",
    },
    {
      question: "What is the purpose of a visiting card?",
      answer:
        "Visiting cards serve as a physical introduction and marketing tool that makes you memorable.",
    },
    {
      question: "We provide fast on-demand printing",
      answer:
        "With our advanced printers and optimized processes, we deliver quality print products rapidly.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="fw-bold mb-4">Frequently Asked Questions</h2>

        <img
          src="https://img.freepik.com/free-vector/people-ask-frequently-asked-questions_102902-2339.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740"
          alt="FAQ Illustration"
          className="img-fluid mb-5 col-12"
          style={{ maxWidth: "600px" }}
        />

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`col-12 border rounded mb-3 p-3 bg-${activeIndex === index ? "light" : "white"}`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <strong>{faq.question}</strong>
              <span>{activeIndex === index ? "▲" : "▼"}</span>
            </div>
            {activeIndex === index && (
              <div className="mt-2 text-secondary">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FaqPage;
