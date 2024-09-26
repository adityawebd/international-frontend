'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import axios from 'axios';

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const page = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [address, setaddress] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [addressThree, setAddressThree] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [city, setCity] = useState('');
    const [region, setregion] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [redirectToHome, setRedirectToHome] = useState(false);

    const notify = () =>
        toast.success("Registration Succesful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

    // Hard-coded list of countries
    const countries = ["United States", "Canada", "India", "Australia", "United Kingdom", "Germany", "France", "Japan"];

    const   handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful

            const user={
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                address,
                city,
                postalCode,
                country,
                region,
            }

            
            const res = await axios.post("/api/register", user);
            
            if (res.status == 200 || res.status == 201) {
                //console.log("user added successfully");
                // setNotification({ message: 'successfully Register' , status: 'success' });
                // alert("Registration Succesful!")
                notify();
            }
            if(res.status == 400 || res.status == 401)
                alert(res.error)
            
            setRedirectToHome(true);
        } else {
            setErrors(errors);
            // setNotification({ message: 'Something went wrong' , status: 'error' });
        }
    };


    const validateForm = () => {
        let errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate first name
        if (!firstName.trim()) {
            errors.firstName = 'First Name is required';
        } else if (firstName.length < 3) {
            errors.firstName = 'First name should not be less than 3 characters';
        }

        // Validate email (email)
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate password
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
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
            <Breadcrumbs page_title="Register" />
            <ToastContainer />  
            

            <div className="register py-5">
                <div className="container">
                    <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>Register</h2>
                    <p className='text-center text-sm light_black_font'>Best place to buy and sell digital products</p>

                    <div className="register_form mt-5" onSubmit={handleSubmit}>
                        <form>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="firstName">First Name<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setfirstName(e.target.value)}
                                        className={errors.firstName && 'error'}
                                        placeholder='Enter first name'
                                        required
                                    />
                                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setlastName(e.target.value)}
                                        className={errors.lastName && 'error'}
                                        placeholder='Enter last name'
                                    />
                                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="email">Email Address<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        className={errors.email && 'error'}
                                        placeholder='Email'
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="password">Create Password<span className='asterik'>*</span></label>
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
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="phoneNumber">Phone Number<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setphoneNumber(e.target.value)}
                                        className={errors.phoneNumber && 'error'}
                                        placeholder='Enter phone number'
                                        required
                                    />
                                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="postalCode">Post Code<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={(e) => setpostalCode(e.target.value)}
                                        className={errors.postalCode && 'error'}
                                        placeholder='Enter post code'
                                        required
                                    />
                                    {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="address">Address<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        className={errors.address && 'error'}
                                        placeholder='Your full address'
                                        required
                                    />
                                    {errors.address && <p className="error-message">{errors.address}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="city">City<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className={errors.city && 'error'}
                                        placeholder='Enter city'
                                        required
                                    />
                                    {errors.city && <p className="error-message">{errors.city}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="region">State<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="region"
                                        value={region}
                                        onChange={(e) => setregion(e.target.value)}
                                        className={errors.region && 'error'}
                                        placeholder='Enter state'
                                        required
                                    />
                                    {errors.region && <p className="error-message">{errors.region}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="country">Country<span className='asterik'>*</span></label>
                                    <select
                                        id="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className={errors.country && 'error'}
                                        required
                                    >
                                        <option value="">Select country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="error-message">{errors.country}</p>}
                                </div>
                            </div>

                            <button type="submit">Register</button>

                            <div className="flex justify-center mt-5 light_black_font">
                                Already have an account? &nbsp; <a href="/login" className='underline font-semibold'>Login here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
