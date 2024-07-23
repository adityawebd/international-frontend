'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

const page = () => {

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [redirectToHome, setRedirectToHome] = useState(false);
  // var [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate backend authentication (replace with actual backend call)
      // For demonstration purposes, assume login is successful
      const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
      console.log('Usernace/Email:', email);

      // Set state to trigger redirection
      setRedirectToHome(true);
    } else {
      setErrors(errors);
    }
  };


  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email (email)
    if (!email.trim()) {
      errors.email = 'email (email) is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  useEffect(() => {
    if (redirectToHome) {
      // Redirect to home page after successful login
      window.location.href = '/otp-verification'; // Replace with your desired URL
    }
  }, [redirectToHome]);

  

    // const handleSubmit = async () => {
    //     e.preventDefault();
    //      email=email.toLowerCase();
    //     const res = await fetch('/api/forgot-password', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email }),
    //     });

    //     const data = await res.json();
    //     alert(data.message)
    //     if (res.ok) {
    //         window.location.replace('/reset-password')// Redirect to the reset password page
    //     }
        
    // };

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
                <label htmlFor="email">Email Address<span className='asterik'>*</span></label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email && 'error'}
                  placeholder='Email'
                  required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
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
