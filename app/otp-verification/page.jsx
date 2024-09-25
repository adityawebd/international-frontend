'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

const page = () => {

    // const [otp, setOtp] = useState('');
    // const [errors, setErrors] = useState({});
    // const [redirectToHome, setRedirectToHome] = useState(false);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const errors = validateForm();
    //     if (Object.keys(errors).length === 0) {
    //         // Simulate backend authentication (replace with actual backend call)
    //         // For demonstration purposes, assume login is successful
    //         //console.log('OTP:', otp);

    //         // alert on successful registration
    //         alert("OTP Verification Successful!")   
    //         // Set state to trigger redirection
    //         setRedirectToHome(true);
    //     } else {
    //         setErrors(errors);
    //     }
    // };


    // const validateForm = () => {
    //     let errors = {};

    //     // Validate otp
    //     if (!otp.trim()) {
    //         errors.otp = 'OTP is required';
    //     } else if (otp.length != 6) {
    //         errors.otp = 'Invalid OTP! Please provide correct OTP';
    //     }

    //     return errors;
    // };

    // useEffect(() => {
    //     if (redirectToHome) {
    //         // Redirect to home page after successful login
    //         window.location.href = '/create-password'; // Replace with your desired URL
    //     }
    // }, [redirectToHome]);


    var [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
         email=email.toLowerCase();
        const res = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp, newPassword }),
        });

        const data = await res.json();
        alert(data.message);
        if (res.ok) {
            window.location.replace('/login')// Redirect to the reset password page
        }
    };

    return (
        <div>
            <Navbar />
      <Breadcrumbs page_title="OTP Verification" />

            <div className="login py-5">
                <div className="container">
                    <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>OTP Verification</h2>
                    <p className='text-center text-sm light_black_font'>Best place to buy and sell digital products</p>

                    <div className="login_form mt-5" onSubmit={handleSubmit}>
                        
                        {/* <form>
                            <div className="form-group">
                                <label htmlFor="otp">OTP<span className='asterik'>*</span></label>
                                <input
                                    type="password"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className={errors.otp && 'error'}
                                    placeholder='*** ***'
                                    required
                                />
                                {errors.otp && <p className="error-message">{errors.otp}</p>}
                            </div>

                            <button type="submit">VERIFY</button>
                        </form> */}
                                                            <form onSubmit={handleSubmit}>
                                        <span className="ec-login-wrap">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="Enter your email"
                                            />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                                placeholder="Enter OTP"
                                            />
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                placeholder="Enter new password"
                                            />
                                        </span>

                                        <span className="ec-login-wrap ec-login-fp">

                                        </span>
                                        <span className="ec-login-wrap ec-login-btn">
                                            <button className="btn btn-primary rounded-3" type="submit">Submit</button>

                                        </span>
                                    </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
