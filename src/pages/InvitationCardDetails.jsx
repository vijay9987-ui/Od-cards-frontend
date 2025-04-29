import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const invitationData = [
  {
    id: 1,
    title: "Wedding Invitation",
    description: "Join us for the celebration of love. This elegant invitation features floral designs and gold accents, perfect for your special day. The card comes with matching envelopes and RSVP cards.",
    image: "https://img.freepik.com/free-psd/floral-wedding-invitation-banner-template_23-2149336651.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "0",
    size: "5x7 inches",
    paperType: "Matte Finish"
  },
  {
    id: 2,
    title: "Birthday Bash",
    description: "You're invited to a fun-filled birthday party! This colorful invitation features balloons and confetti designs. Perfect for kids and adults alike! Includes digital version for email invites.",
    image: "https://img.freepik.com/free-psd/floral-wedding-celebration-web-template_23-2149750163.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "0",
    size: "4x6 inches",
    paperType: "Glossy Finish"
  },
  {
    id: 3,
    title: "Graduation Party",
    description: "Celebrate this milestone with us. Sophisticated design with academic motifs. Premium quality cardstock with foil stamping option available. Includes matching thank you cards.",
    image: "https://img.freepik.com/free-vector/set-collection-luxury-wedding-invitation-card-template_4513-238.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$20",
    size: "5x7 inches",
    paperType: "Pearl Finish"
  },
  {
    id: 4,
    title: "Baby Shower",
    description: "A sweet celebration for the upcoming arrival. Adorable designs featuring baby themes. Choose from pink, blue or neutral color schemes. Includes coordinating thank you notes.",
    image: "https://img.freepik.com/free-psd/wedding-invitation-horizontal-banner-template_23-2149336649.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$40",
    size: "5x7 inches",
    paperType: "Textured Finish"
  },
  {
    id: 5,
    title: "Holiday Party",
    description: "Join us for a festive celebration this holiday season.",
    image: "https://img.freepik.com/free-psd/holiday-party-invitation-banner-template_23-2149336621.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$15",
    size: "5x7 inches",
    paperType: "Glossy Finish"
  },
  {
    id: 6,
    title: "Retirement Celebration",
    description: "Celebrate a wonderful career with us.",
    image: "https://img.freepik.com/free-psd/retirement-party-invitation-banner-template_23-2149336620.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$25",
    size: "5x7 inches",
    paperType: "Matte Finish"
  },
  {
    id: 7,
    title: "New Year’s Eve Bash",
    description: "Ring in the New Year with style and fun.",
    image: "https://img.freepik.com/free-psd/new-year-eve-party-invitation-banner-template_23-2149336605.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$50",
    size: "5x7 inches",
    paperType: "Pearl Finish"
  },
  {
    id: 8,
    title: "Housewarming Party",
    description: "Celebrate our new home with us.",
    image: "https://img.freepik.com/free-psd/housewarming-party-invitation-banner-template_23-2149336610.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$30",
    size: "5x7 inches",
    paperType: "Textured Finish"
  },
  {
    id: 9,
    title: "Anniversary Celebration",
    description: "Join us in celebrating a special milestone.",
    image: "https://img.freepik.com/free-psd/anniversary-celebration-invitation-banner-template_23-2149336602.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$20",
    size: "5x7 inches",
    paperType: "Matte Finish"
  },
  {
    id: 10,
    title: "Engagement Party",
    description: "Celebrate our love and future together.",
    image: "https://img.freepik.com/free-psd/engagement-party-invitation-banner-template_23-2149336595.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740",
    price: "$35",
    size: "5x7 inches",
    paperType: "Glossy Finish"
  },
  {
    id: 11,
    title: "Bridal Shower",
    description: "Celebrate the bride-to-be with this elegant floral design. Features delicate watercolor flowers and gold foil accents. Includes matching thank you cards and envelope seals.",
    image: "https://img.freepik.com/free-psd/bridal-shower-invitation-template_23-2149336654.jpg",
    price: "$28",
    size: "5x7 inches",
    paperType: "Pearl Finish"
  },
  {
    id: 12,
    title: "Graduation Announcement",
    description: "Proudly announce this academic achievement. Modern design with customizable school colors. Includes digital version for sharing on social media.",
    image: "https://img.freepik.com/free-vector/graduation-card-template_23-2147504067.jpg",
    price: "$18",
    size: "4.25x5.5 inches",
    paperType: "Matte Finish"
  },
  {
    id: 13,
    title: "Baby's First Birthday",
    description: "Celebrate this special milestone with adorable cake and balloon designs. Choose from multiple color themes. Includes coordinating cupcake toppers.",
    image: "https://img.freepik.com/free-psd/baby-first-birthday-invitation-template_23-2149336624.jpg",
    price: "$22",
    size: "5x5 inches",
    paperType: "Glossy Finish"
  },
  {
    id: 14,
    title: "Corporate Event",
    description: "Professional design for business gatherings and conferences. Clean layout with company branding options. Premium cardstock with embossed logo available.",
    image: "https://img.freepik.com/free-psd/corporate-event-invitation-template_23-2149336631.jpg",
    price: "$35",
    size: "4x9 inches",
    paperType: "Linen Finish"
  },
  {
    id: 15,
    title: "Summer Pool Party",
    description: "Vibrant tropical design for your sunny celebration. Water-resistant material perfect for poolside events. Includes matching drink coasters.",
    image: "https://img.freepik.com/free-psd/summer-pool-party-invitation-template_23-2149336638.jpg",
    price: "$24",
    size: "4x6 inches",
    paperType: "Synthetic Waterproof"
  },
  {
    id: 16,
    title: "Vintage Tea Party",
    description: "Elegant antique design with floral patterns and distressed edges. Includes coordinating place cards and menu cards. Gold foil upgrade available.",
    image: "https://img.freepik.com/free-vector/vintage-tea-party-invitation-template_23-2147504063.jpg",
    price: "$32",
    size: "5x7 inches",
    paperType: "Textured Cotton"
  },
  {
    id: 17,
    title: "Sports Banquet",
    description: "Dynamic design featuring various sports motifs. Customizable with team colors and mascot. Includes achievement certificate inserts.",
    image: "https://img.freepik.com/free-psd/sports-banquet-invitation-template_23-2149336642.jpg",
    price: "$20",
    size: "4.25x5.5 inches",
    paperType: "Glossy Finish"
  },
  {
    id: 18,
    title: "Art Gallery Opening",
    description: "Sophisticated minimalist design for creative events. Features a customizable artwork window. Premium thick cardstock with deckled edges option.",
    image: "https://img.freepik.com/free-psd/art-gallery-opening-invitation-template_23-2149336635.jpg",
    price: "$40",
    size: "5x7 inches",
    paperType: "Recycled Art Paper"
  },
  {
    id: 19,
    title: "Masquerade Ball",
    description: "Mysterious and elegant design featuring mask motifs. Includes velvet ribbon accent. Gold or silver foil stamping available.",
    image: "https://img.freepik.com/free-vector/masquerade-ball-invitation-template_23-2147504065.jpg",
    price: "$45",
    size: "5x7 inches",
    paperType: "Pearlized Black"
  },
  {
    id: 20,
    title: "Garden Party",
    description: "Beautiful botanical design with pressed flower accents. Eco-friendly seed paper option available (can be planted after use). Includes herb sachet favors.",
    image: "https://img.freepik.com/free-psd/garden-party-invitation-template_23-2149336645.jpg",
    price: "$38",
    size: "5x7 inches",
    paperType: "Seed Paper"
  }



];



const InvitationCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = invitationData.find((item) => item.id === parseInt(id));

  if (!card) {
    return (
      <div className="container text-center py-5">
        <h2>Card not found</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/dashboard/category/invitation-cards')}
        >
          Back to Invitation Cards
        </button>
      </div>
    );
  }
  const handleAddToCart = () =>{
    console.log(card);
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={card.image}
              alt={card.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <h2>{card.title}</h2>
            <p className="lead">{card.description}</p>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Price:</strong> {card.price === "0" ? "Free" : card.price}
                  </li>
                  <li className="list-group-item">
                    <strong>Size:</strong> {card.size}
                  </li>
                  <li className="list-group-item">
                    <strong>Paper Type:</strong> {card.paperType}
                  </li>
                </ul>
              </div>
            </div>
            {card.price === "0" ? (
              <a
                href={card.image}
                download={`${card.title.replace(/\s+/g, '-')}.jpg`}
                className="btn btn-success btn-lg me-2"
              >
                <i className="fas fa-download me-2"></i>Download Now
              </a>
            ) : (
              <button className="btn btn-warning btn-lg me-2" onClick={handleAddToCart}>
                <i className="fas fa-cart-plus me-2"></i>Add to Cart
              </button>
            )}
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/dashboard/category/invitation-cards')}
            >
              Back to Invitations
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvitationCardDetails;