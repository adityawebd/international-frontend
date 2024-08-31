'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import BackToTopButton from '../components/BackToTopButton'

import { MapPin, Phone, Mail } from 'lucide-react'


const page = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful
            console.log('Username:', firstname);
            console.log('Password:', lastname);
            console.log('Password:', username);
            console.log('Password:', phone);
            console.log('Password:', message);

            // alert on successful registration
            alert("Form Submitted SuccesFully!")
            // Set state to trigger redirection
            setRedirectToHome(true);
        } else {
            setErrors(errors);
        }
    };


    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate first name
        if (!firstname.trim()) {
            errors.firstname = 'First Name is required';
        } else if (firstname.length < 3) {
            errors.firstname = 'First name should not be less than 3 characters';
        }

        // Validate username (email)
        if (!username.trim()) {
            errors.username = 'Username (email) is required';
        } else if (!emailRegex.test(username)) {
            errors.username = 'Please enter a valid email address';
        }

        // Validate phone number
        if (!phone.trim()) {
            errors.phone = 'Phone Number is required';
        } else if (phone.length < 10) {
            errors.phone = 'Phone must have valid character length';
        }

        // Validate message
        if (message.length < 10) {
            errors.message = 'Message should be greater than 10 characters';
        }

        return errors;
    };

    useEffect(() => {
        if (redirectToHome) {
            // Redirect to home page after successful submission
            window.location.href = '/'; // Replace with your desired URL
        }
    }, [redirectToHome]);

    return (
        <div>
            <Navbar />
            <Breadcrumbs page_title="Contact Us" />

            <div className="contact_page py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="contact_form" onSubmit={handleSubmit}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name<span className='asterik'>*</span></label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className={errors.firstname && 'error'}
                                            placeholder='Enter first name'
                                            required
                                        />
                                        {errors.firstname && <p className="error-message">{errors.firstname}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className={errors.lastname && 'error'}
                                            placeholder='Enter last name'
                                        />
                                        {errors.lastname && <p className="error-message">{errors.lastname}</p>}
                                    </div>
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
                                    <div className="form-group">
                                        <label htmlFor="password">Phone Number<span className='asterik'>*</span></label>
                                        <input
                                            type="number"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className={errors.phone && 'error'}
                                            placeholder='Enter Phone Number'
                                            required
                                        />
                                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Questions/Comments<span className='asterik'>*</span></label>
                                        <textarea
                                            type="text"
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className={errors.message && 'error'}
                                            placeholder='Please leave your comments here...'
                                            required
                                        />
                                        {errors.message && <p className="error-message">{errors.message}</p>}
                                    </div>

                                    <button type="submit">SUBMIT</button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="map_integration" id='map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.937014323291!2d77.14877257613877!3d28.6915306813978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0302948a64a9%3A0xb00c6662e07ddf21!2sRapid%20Digital%20Growth%20-%20Best%20Digital%20Marketing%20Agency%20in%20Delhi!5e0!3m2!1sen!2sin!4v1721045264315!5m2!1sen!2sin"
                                    width="600"
                                    height="450"
                                    // style="border:0;" 
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <div className="contact_links mt-4">
                                <div className="flex light_black_font text-base mb-3">
                                    <span className='green_font'><MapPin /></span> &nbsp;&nbsp;
                                    <p> <b>Address:</b> Warehouse 5, Plot No. - 337, Om Vihar Phase - 1, Uttam Nagar, New Delhi - 59, Delhi,
                                    West Delhi, 110059.</p>
                                </div>
                                <div className="flex light_black_font text-base mb-4">
                                    <span className='green_font'><Phone /></span> &nbsp;&nbsp;
                                    <p> <b>Call Us:</b> +91 8800217402                                    </p>
                                </div>
                                <div className="flex light_black_font text-base">
                                    <span className='green_font'><Mail /></span> &nbsp;&nbsp;
                                    <p> <b>Email:</b> Rakesh@InternationalGift.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
            <BackToTopButton />
        </div>
    )
}

export default page
