import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'none',
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    pincode: '',
    phone: '',
    label: ''
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

  const [orders, setOrders] = useState([]);

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.pincode && newAddress.phone && newAddress.label) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({ name: '', address: '', pincode: '', phone: '', label: '' });
      setShowAddressForm(false);
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(updatedAddresses);
  };

  const handleAddOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-4 mb-4 ">
            <div className="card shadow-sm p-4 text-center border-0 rounded-4 mb-4">
              <div className="d-flex flex-column align-items-center">
                <div className="bg-light rounded-circle p-3 mb-3">
                  <i className="fa-solid fa-user fa-2xl text-secondary"></i>
                </div>
                <h5 className="fw-bold mb-1">{userInfo.firstName} {userInfo.lastName}</h5>
                <p className="text-muted small mb-0">{userInfo.email}</p>
              </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <ul className="nav flex-column nav-pills p-3">
                {['profile', 'address', 'orders'].map((tab) => (
                  <li className="nav-item mb-2" key={tab}>
                    <button
                      className={`nav-link w-100 text-start ${activeTab === tab ? 'active' : ''}`}
                      style={{
                        background: activeTab === tab ? 'linear-gradient(to right, #F8483C, #DE2B59)' : '',
                        color: activeTab === tab ? 'white' : 'black',
                        fontWeight: '500',
                        borderRadius: '8px'
                      }}
                      onClick={() => {
                        setActiveTab(tab);
                        setShowAddressForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      <i className={`me-2 ${tab === 'profile' ? 'fa fa-user' : tab === 'address' ? 'fa fa-map-marker-alt' : 'fa fa-box'}`}></i>
                      {tab === 'profile' ? 'Profile Info' : tab === 'address' ? 'My Addresses' : 'Order History'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-8">
            <div className="card shadow-sm p-4 border-0 rounded-4">
              {activeTab === 'profile' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold">Profile Information</h5>
                    {isEditing ? (
                      <button
                        className="btn btn-sm"
                        onClick={() => setIsEditing(false)}
                        style={{ background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: 'white' }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  <form className="row g-3">
                    {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                      <div className={`col-12 col-md-${field === 'firstName' || field === 'lastName' ? 6 : 12}`} key={field}>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          className="form-control rounded-3"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={userInfo[field]}
                          disabled={!isEditing}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, [field]: e.target.value })
                          }
                        />
                      </div>
                    ))}
                    
                    <div className="col-12">
                      <select
                        className="form-select rounded-3"
                        value={userInfo.gender}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                      >
                        <option value="none" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'address' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold">Saved Addresses</h5>
                    {!showAddressForm && editingIndex === null && (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setShowAddressForm(true);
                          setEditingIndex(null);
                        }}
                      >
                        <i className="fa fa-plus me-2"></i>Add Address
                      </button>
                    )}
                  </div>

                  {addresses.length > 0 ? (
                    addresses.map((addr, idx) => (
                      <div key={idx} className="border p-3 rounded-3 mb-3 bg-light position-relative">
                        <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setEditingIndex(idx);
                              setEditAddress({ ...addr });
                              setShowAddressForm(false);
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteAddress(idx)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <h6 className="mb-1">{addr.name}</h6>
                        <p className="mb-1 small">{addr.address}, {addr.pincode}</p>
                        <p className="mb-1 small">{addr.phone}</p>
                        <span className="badge bg-primary">{addr.label}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No addresses saved yet.</p>
                  )}

                  {showAddressForm && (
                    <>
                      <h6 className="fw-bold mt-5 mb-3">Add New Address</h6>
                      <div className="row g-3">
                        {['name', 'pincode', 'address', 'phone'].map((field) => (
                          <div className={`col-12 col-md-${field === 'name' || field === 'pincode' ? 6 : 12}`} key={field}>
                            <input
                              type="text"
                              className="form-control rounded-3"
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                              value={newAddress[field]}
                              onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                            />
                          </div>
                        ))}

                        <div className="col-12">
                          <div className="btn-group w-100" role="group">
                            {['Home', 'Office', 'Other'].map((label) => (
                              <React.Fragment key={label}>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="addressLabel"
                                  id={label}
                                  autoComplete="off"
                                  checked={newAddress.label === label}
                                  onChange={() => setNewAddress({ ...newAddress, label })}
                                />
                                <label className="btn btn-outline-primary" htmlFor={label}>
                                  {label}
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        <div className="col-12 d-flex gap-2">
                          <button
                            className="btn flex-grow-1"
                            style={{ background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: 'white' }}
                            onClick={handleAddAddress}
                          >
                            Save Address
                          </button>
                          <button
                            className="btn btn-outline-secondary flex-grow-1"
                            onClick={() => setShowAddressForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {editingIndex !== null && editAddress && (
                    <>
                      <h6 className="fw-bold mt-5 mb-3">Edit Address</h6>
                      <div className="row g-3">
                        {['name', 'pincode', 'address', 'phone'].map((field) => (
                          <div className={`col-12 col-md-${field === 'name' || field === 'pincode' ? 6 : 12}`} key={field}>
                            <input
                              type="text"
                              className="form-control rounded-3"
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                              value={editAddress[field]}
                              onChange={(e) => setEditAddress({ ...editAddress, [field]: e.target.value })}
                            />
                          </div>
                        ))}

                        <div className="col-12">
                          <div className="btn-group w-100" role="group">
                            {['Home', 'Office', 'Other'].map((label) => (
                              <React.Fragment key={label}>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="editAddressLabel"
                                  id={`edit-${label}`}
                                  autoComplete="off"
                                  checked={editAddress.label === label}
                                  onChange={() => setEditAddress({ ...editAddress, label })}
                                />
                                <label className="btn btn-outline-primary" htmlFor={`edit-${label}`}>
                                  {label}
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        <div className="col-12 d-flex gap-2">
                          <button
                            className="btn flex-grow-1"
                            style={{ background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: 'white' }}
                            onClick={() => {
                              const updated = [...addresses];
                              updated[editingIndex] = editAddress;
                              setAddresses(updated);
                              setEditingIndex(null);
                              setEditAddress(null);
                            }}
                          >
                            Save Changes
                          </button>

                          <button
                            className="btn btn-outline-secondary flex-grow-1"
                            onClick={() => {
                              setEditingIndex(null);
                              setEditAddress(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === 'orders' && (
                <>
                  <h5 className="fw-bold mb-4">Order History</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered rounded-3 overflow-hidden">
                      <thead className="table-light">
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">No orders yet.</td>
                          </tr>
                        ) : (
                          orders.map((order, idx) => (
                            <tr key={idx}>
                              <td>{order.id}</td>
                              <td>{order.date}</td>
                              <td><span className={`badge bg-${order.status === 'Delivered' ? 'success' : 'warning'}`}>{order.status}</span></td>
                              <td>{order.total}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;