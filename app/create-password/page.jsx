'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'


const page = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);

            // alert on successful registration
            alert("Password Created Successfully!")
            // Set state to trigger redirection
            setRedirectToHome(true);
        } else {
            setErrors(errors);
        }
    };


    const validateForm = () => {
        let errors = {};

        // Validate password
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        // Validate confirm password
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Passowrd is required';
        } else if (confirmPassword.length < 6) {
            errors.confirmPassword = 'Confirm Passowrd must be at least 6 characters';
        }

        // if password and confirmPassword matches
        if (password != confirmPassword) {  
            errors.confirmPassword = 'Password and Confirm Password Should be Same';
        } 
        return errors;
    };

    useEffect(() => {
        if (redirectToHome) {
            // Redirect to home page after successful login
            window.location.href = '/login'; // Replace with your desired URL
        }
    }, [redirectToHome]);

    return (
        <div>
            <Navbar />
      <Breadcrumbs page_title="Create Password" />


            <div className="login py-5">
                <div className="container">
                    <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>Create New Password</h2>
                    <p className='text-center text-sm light_black_font'>Best place to buy and sell digital products</p>

                    <div className="login_form mt-5" onSubmit={handleSubmit}>
                        <form>
                            <div className="form-group">
                                <label htmlFor="password">Password<span className='asterik'>*</span></label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={errors.password && 'error'}
                                    placeholder='********'
                                    required
                                />
                                {errors.password && <p className="error-message">{errors.password}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password">Confirm Password<span className='asterik'>*</span></label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={errors.confirmPassword && 'error'}
                                    placeholder='********'
                                    required
                                />
                                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                            </div>

                            <button type="submit">CREATE</button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
