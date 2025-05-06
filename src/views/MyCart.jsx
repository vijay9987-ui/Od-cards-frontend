import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyCart = () => {
  const location = useLocation();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    type: "Home",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    if (location.state?.newItem) {
      const newItem = { ...location.state.newItem, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
      )
    );
  };

  const priceDetails = {
    itemsPrice: cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0),
    discount: 500,
    delivery: 40,
  };
  priceDetails.total = priceDetails.itemsPrice - priceDetails.discount + priceDetails.delivery;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    setShowAddressForm(true);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: savedAddresses.length + 1,
      ...address,
    };

    setSavedAddresses((prev) => [...prev, newAddress]);
    setShowAddressForm(false);
    setAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      pincode: "",
      type: "Home",
    });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((address) => address.id !== id));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddress({ ...address });
    setShowAddressForm(true);
  };

  const handleUpdateAddress = () => {
    setSavedAddresses((prev) =>
      prev.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...address } : addr))
    );
    setEditingAddress(null);
    setShowAddressForm(false);
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
                <select
                  className="form-select w-auto my-2"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 10, 25, 50, 100].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <p className="text-muted mb-2">Delivery by 26 Feb</p>
                <p className="fw-bold">
                  Total: ₹ {item.price * (item.quantity || 1)}
                </p>
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

        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Price Details</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Price ({cartItems.length} item)
                <span>₹ {priceDetails.itemsPrice}</span>
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

          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Delivery Details</h5>

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
                        onClick={() => handleSelectAddress(addr)}
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
                            e.stopPropagation();
                            handleDeleteAddress(addr.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm mt-2 ms-2"
                          onClick={(e) => {
                            e.stopPropagation();
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
