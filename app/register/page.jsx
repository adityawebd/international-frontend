'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

const page = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [addressThree, setAddressThree] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    const [errors, setErrors] = useState({});
    const [redirectToHome, setRedirectToHome] = useState(false);

    // Hard-coded list of countries
    const countries = ["United States", "Canada", "India", "Australia", "United Kingdom", "Germany", "France", "Japan"];

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful
            console.log('First Name:', firstname);
            console.log('Last Name:', lastname);
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Phone Number:', phone);
            console.log('Address Line 1:', addressOne);
            console.log('Address Line 2:', addressTwo);
            console.log('Address Line 3:', addressThree);
            console.log('Post Code:', postCode);
            console.log('City:', city);
            console.log('State:', state);
            console.log('Country:', country);

            // alert on successful registration
            alert("Registration Succesful!")
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
            errors.username = 'Email is required';
        } else if (!emailRegex.test(username)) {
            errors.username = 'Please enter a valid email address';
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
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={errors.firstname && 'error'}
                                        placeholder='Enter first name'
                                        required
                                    />
                                    {errors.firstname && <p className="error-message">{errors.firstname}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
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
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
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
                                    <label htmlFor="phone">Phone Number<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={errors.phone && 'error'}
                                        placeholder='Enter phone number'
                                        required
                                    />
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="postCode">Post Code<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="postCode"
                                        value={postCode}
                                        onChange={(e) => setPostCode(e.target.value)}
                                        className={errors.postCode && 'error'}
                                        placeholder='Enter post code'
                                        required
                                    />
                                    {errors.postCode && <p className="error-message">{errors.postCode}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="addressOne">Address<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="addressOne"
                                        value={addressOne}
                                        onChange={(e) => setAddressOne(e.target.value)}
                                        className={errors.addressOne && 'error'}
                                        placeholder='Enter address line 1'
                                        required
                                    />
                                    {errors.addressOne && <p className="error-message">{errors.addressOne}</p>}
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
                                    <label htmlFor="addressTwo">Address Line 2<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="addressTwo"
                                        value={addressTwo}
                                        onChange={(e) => setAddressTwo(e.target.value)}
                                        className={errors.addressTwo && 'error'}
                                        placeholder='Enter address line 2'
                                        required
                                    />
                                    {errors.addressTwo && <p className="error-message">{errors.addressTwo}</p>}
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="state">State<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className={errors.state && 'error'}
                                        placeholder='Enter state'
                                        required
                                    />
                                    {errors.state && <p className="error-message">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label htmlFor="addressThree">Address Line 3<span className='asterik'>*</span></label>
                                    <input
                                        type="text"
                                        id="addressThree"
                                        value={addressThree}
                                        onChange={(e) => setAddressThree(e.target.value)}
                                        className={errors.addressThree && 'error'}
                                        placeholder='Enter address line 3'
                                        required
                                    />
                                    {errors.addressThree && <p className="error-message">{errors.addressThree}</p>}
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
