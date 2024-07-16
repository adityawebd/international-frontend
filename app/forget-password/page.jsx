'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

const page = () => {

  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate backend authentication (replace with actual backend call)
      // For demonstration purposes, assume login is successful
      console.log('Usernace/Email:', username);

      // Set state to trigger redirection
      setRedirectToHome(true);
    } else {
      setErrors(errors);
    }
  };


  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate username (email)
    if (!username.trim()) {
      errors.username = 'Username (email) is required';
    } else if (!emailRegex.test(username)) {
      errors.username = 'Please enter a valid email address';
    }

    return errors;
  };

  useEffect(() => {
    if (redirectToHome) {
      // Redirect to home page after successful login
      window.location.href = '/otp-verification'; // Replace with your desired URL
    }
  }, [redirectToHome]);

  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="Forget Passowrd" />


      <div className="login py-5">
        <div className="container">
          <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>Forget Password</h2>
          <p className='text-center text-sm light_black_font'>Best place to buy and sell digital products</p>

          <div className="login_form mt-5" onSubmit={handleSubmit}>
            <form>
              <div className="form-group">
                <label htmlFor="username">Email Address<span className='asterik'>*</span></label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username && 'error'}
                  placeholder='Email'
                  required
                />
                {errors.username && <p className="error-message">{errors.username}</p>}
              </div>

              <button type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page
