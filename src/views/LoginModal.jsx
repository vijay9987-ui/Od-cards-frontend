import React, { useState, useEffect } from 'react';


const LoginModal = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', mobile);
    setStep(2);
    setTimer(30);
    setResendDisabled(true);
  };

  const handleOtpChange = (index, e) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);
    if (e.target.value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleResendOtp = () => {
    if (!resendDisabled) {
      console.log('Resending OTP to:', mobile);
      setTimer(30);
      setResendDisabled(true);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp);
    const userExists = false; // Replace with backend check
    if (userExists) {
      console.log('Login success');
      onClose();
    } else {
      setStep(3);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signing up:', { ...formData, mobile });
    onClose();
  };

  return (

    <div className="modal-overlay">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <button className="btn-close position-absolute top-0 end-0 m-3" onClick={onClose}></button>
          {/* ... your modal content (step logic) ... */}
                {/* Step 1 - Mobile Entry */}
                {step === 1 && (
                  <div className="row">
                    <div className="col-lg-7 col-md-6 d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
                      <h2>Welcome!</h2>
                      <p>Login with your mobile to continue shopping</p>
                    </div>
                    <div className="col-lg-5 col-md-6 home1 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4">
                      <h2 className="text-success">Login with Mobile</h2>
                      <form className="w-75" onSubmit={handleSendOtp}>
                        <input
                          type="tel"
                          className="form-control mb-3"
                          placeholder="Enter Mobile Number"
                          maxLength={10}
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        <button className="btn btn-light w-100" type="submit">
                          Send OTP
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Step 2 - OTP Verification */}
                {step === 2 && (
                  <div className="row">
                    <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
                      <h2>Secure Login</h2>
                      <p>We’ll log you in once you verify the OTP</p>
                      <button className="btn btn-outline-secondary w-50 mb-3" onClick={() => setStep(1)}>
                        Back
                      </button>
                    </div>
                    <div className="col-lg-5 home1 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4">
                      <h2 className="text-success">Verify OTP</h2>
                      <p>Enter the OTP sent to <strong>{mobile}</strong></p>
                      <div className="d-flex justify-content-center mb-3">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            className="form-control text-center mx-1"
                            style={{ width: '50px', height: '50px', fontSize: '24px' }}
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e)}
                          />
                        ))}
                      </div>
                      <div className="d-flex justify-content-between w-75">
                        <span>{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}</span>
                        <button className="btn btn-link p-0" disabled={resendDisabled} onClick={handleResendOtp}>
                          Resend OTP
                        </button>
                      </div>
                      <button className="btn btn-light w-50 mt-3" onClick={handleVerifyOtp}>
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Signup */}
                {step === 3 && (
                  <div className="row">
                    <div className="col-lg-5 home1 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white text-center p-4">
                      <h2>New Here?</h2>
                      <p>Complete your profile to get started</p>
                    </div>
                    <div className="col-lg-7 d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
                      <h2 className="text-success">Complete Sign Up</h2>
                      <form className="w-75" onSubmit={handleSignUp}>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                        <input
                          type="email"
                          className="form-control mb-3"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                        <input
                          type="tel"
                          className="form-control mb-3"
                          value={mobile}
                          disabled
                        />
                        <button className="btn btn-success w-100" type="submit">
                          Sign Up
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  );
};

export default LoginModal;
