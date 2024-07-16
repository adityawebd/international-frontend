'use client'
import React, { useState } from 'react';

const Checkout = () => {

  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    city: '',
    postcode: '',
    country: '',
    state: '',
    paymentMethod: '',
  });

  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (name === 'country') {
      // Fetch states based on selected country
      // For demonstration, using static data
      if (value === 'USA') {
        setStates(['California', 'Texas', 'New York']);
      } else if (value === 'India') {
        setStates(['Delhi', 'Maharashtra', 'Karnataka']);
      } else {
        setStates([]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Form submitted:', profile);
  };


  return (
    <div>
      <div className="checkout_page px-5">
        <h2 className='text-2xl light_black_font font-semibold mb-4'>Billing details</h2>

        <form onSubmit={handleSubmit}>
          <p className='font-medium light_black_font pt-2 pb-3'>Ckeckout options</p>
          <div className="address-checkboxes">
            <label className='light_black_font'>
              <input
                type="checkbox"
                checked={useExistingAddress}
                onChange={() => setUseExistingAddress(!useExistingAddress)}
              /> &nbsp;
              I want to use an existing address
            </label> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label className='light_black_font'>
              <input
                type="checkbox"
                checked={useNewAddress}
                onChange={() => setUseNewAddress(!useNewAddress)}
              /> &nbsp;
              I want to use a new address
            </label>
          </div>

          {useNewAddress && (
            <div className='main_form mt-3'>
              <div className="flex form_flex mb-3">
                <div className="form-group">
                  <label>First Name<span className='asterik'>*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder='First Name'
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name<span className='asterik'>*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder='Last Name'
                    required
                  />
                </div>
              </div>
              <div className=" flex form_flex mb-3">
                <div className="form-group">
                  <label>Address<span className='asterik'>*</span>:</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    placeholder='Address Line 1'
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address Line 2<span className='asterik'>*</span>:</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    placeholder='Address Line 2'
                    required
                  />
                </div>
              </div>
              <div className="flex form_flex mb-3">
                <div className="form-group">
                  <label>City<span className='asterik'>*</span>:</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    placeholder='Enter City'
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Post Code<span className='asterik'>*</span>:</label>
                  <input
                    type="text"
                    name="postcode"
                    value={profile.postcode}
                    onChange={handleChange}
                    placeholder='Enter Post Code'
                    required
                  />
                </div>
              </div>
              <div className="flex form_flex mb-3">
                <div className="form-group">
                  <label>Country<span className='asterik'>*</span>:</label>
                  <select name="country" value={profile.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                  </select>
                </div>
                {profile.country && (
                  <div className="form-group">
                    <label>State<span className='asterik'>*</span>:</label>
                    <select name="state" value={profile.state} onChange={handleChange} required>
                      <option value="">Select State</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="payment-methods mb-4">
            <label className='mb-2'>Payment Method:</label>
            <br></br>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="directBank"
                checked={profile.paymentMethod === 'directBank'}
                onChange={handleChange}
                required
              />&nbsp;
              Direct Bank
            </label> <br />
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="checkPayment"
                checked={profile.paymentMethod === 'checkPayment'}
                onChange={handleChange}
                required
              />&nbsp;
              Check Payment
            </label> <br />
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={profile.paymentMethod === 'paypal'}
                onChange={handleChange}
                required
              />&nbsp;
              PayPal
            </label>
          </div>

          <button type="submit">Place Order</button>
        </form>

      </div>
    </div>
  )
}

export default Checkout
