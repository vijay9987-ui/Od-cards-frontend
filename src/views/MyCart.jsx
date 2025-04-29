import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyCart = () => {
  const location = useLocation();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "Delhi",
      pincode: "110001",
      type: "Home",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Park Ave",
      city: "Mumbai",
      pincode: "400001",
      type: "Office",
    },
  ]);

  const [cartItems, setCartItems] = useState([]); // Initial products removed

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    type: "Home",
  });

  const [selectedAddress, setSelectedAddress] = useState(null); // Store selected address for checkout
  const [editingAddress, setEditingAddress] = useState(null); // Store address being edited

  // Accept the new item passed from ReadyMadeCards via location.state
  useEffect(() => {
    if (location.state?.newItem) {
      setCartItems((prevItems) => [...prevItems, location.state.newItem]);
      // Clear the navigation state to avoid adding duplicate on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const priceDetails = {
    itemsPrice: cartItems.length * 100,
    discount: 500,
    delivery: 40,
    total: 500,
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    setShowAddressForm(true);
  };

  // Save new address to savedAddresses
  const handleAddAddress = () => {
    const newAddress = {
      id: savedAddresses.length + 1, // Generate new ID based on the length
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      city: address.city,
      pincode: address.pincode,
      type: address.type,
    };

    setSavedAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setShowAddressForm(false); // Hide the form after adding the address
    setAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      pincode: "",
      type: "Home",
    }); // Clear the form
  };

  // Set the address form with the selected saved address
  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Set the selected address for checkout
  };

  // Handle delete address functionality
  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
  };

  // Set the address form to edit mode
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddress({
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      city: address.city,
      pincode: address.pincode,
      type: address.type,
    });
    setShowAddressForm(true); // Show address form when editing
  };

  // Update edited address
  const handleUpdateAddress = () => {
    setSavedAddresses((prevAddresses) =>
      prevAddresses.map((addr) =>
        addr.id === editingAddress.id ? { ...addr, ...address } : addr
      )
    );
    setEditingAddress(null); // Clear editing mode
    setShowAddressForm(false); // Hide form after updating
    setAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      pincode: "",
      type: "Home",
    });
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h3 className="fw-bold mb-4">
          <i className="fa fa-shopping-cart me-2"></i>My Cart
        </h3>

        {/* Cart Items (no initial products) */}
        {cartItems.length === 0 ? (
          <p>No items in your cart</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="d-flex mb-4 border-bottom pb-4">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 140, height: 140 }}
                className="me-3"
              />
              <div className="flex-grow-1">
                <h5 className="fw-bold">{item.title}</h5>
                <select className="form-select w-auto my-2">
                  <option>Select Quantity</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <p className="text-muted mb-2">Delivery by 26 Feb</p>
                <p className="fw-bold">Total: ₹ {item.price}</p>
                <button
                  className="btn me-2"
                  style={{
                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                    color: "white",
                  }}
                >
                  Buy this Now
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Price & Address */}
        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Price Details</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Price ({cartItems.length} item) <span>₹ {priceDetails.itemsPrice}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Discount <span className="text-success">-₹ {priceDetails.discount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Delivery Charges <span>₹ {priceDetails.delivery}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                Total <span>₹ {priceDetails.total}</span>
              </li>
            </ul>
            <p className="text-success mt-2">You save ₹ 20 on this order</p>
          </div>

          {/* Address Form */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Delivery Details</h5>

            {/* Show saved addresses initially */}
            {!showAddressForm ? (
              <>
                <div className="mb-3">
                  {savedAddresses.length === 0 ? (
                    <p>No saved addresses</p>
                  ) : (
                    savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`border p-3 mb-2 rounded`}
                        onClick={() => handleSelectAddress(addr)} // Select address for checkout
                        style={{
                          background:
                            selectedAddress?.id === addr.id
                              ? "linear-gradient(to right, #F8483C, #DE2B59)"
                              : "",
                          color: selectedAddress?.id === addr.id ? "white" : "inherit",
                          cursor: "pointer",
                        }}
                      >
                        <div className="fw-bold">
                          {addr.firstName} {addr.lastName} ({addr.type})
                        </div>
                        <div>
                          {addr.address}, {addr.city} - {addr.pincode}
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm mt-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering address select
                            handleDeleteAddress(addr.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm mt-2 ms-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering address select
                            handleEditAddress(addr);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <button
                  className="btn btn-outline-primary mb-3 w-100"
                  onClick={() => setShowAddressForm(true)}
                >
                  + Add New Address
                </button>
              </>
            ) : (
              <>
                {/* Add/Edit Address Form */}
                <div className="row g-2 mb-2">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      value={address.firstName}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Last Name"
                      name="lastName"
                      value={address.lastName}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <input
                  className="form-control mb-2"
                  placeholder="Address"
                  name="address"
                  value={address.address}
                  onChange={handleAddressChange}
                />
                <div className="row g-2 mb-2">
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      placeholder="Pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="btn-group" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="type"
                      id="home"
                      value="Home"
                      checked={address.type === "Home"}
                      onChange={handleAddressChange}
                    />
                    <label className="btn btn-outline-dark" htmlFor="home">
                      <i className="fa fa-home me-1"></i>Home
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="type"
                      id="office"
                      value="Office"
                      checked={address.type === "Office"}
                      onChange={handleAddressChange}
                    />
                    <label className="btn btn-outline-dark" htmlFor="office">
                      <i className="fa fa-building me-1"></i>Office
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-danger w-100"
                  style={{
                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                    color: "white",
                  }}
                  onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-lg"
            style={{
              background: "linear-gradient(to right, #F8483C, #DE2B59)",
              color: "white",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyCart;
