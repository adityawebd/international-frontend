'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import { signIn } from "next-auth/react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const notify = () =>
    toast.success("Login Succesful!", {
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
  const notify2 = () =>
    toast.error("Something Went Wrong! Invalid Email or Password", {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate backend authentication (replace with actual backend call)
      // For demonstration purposes, assume login is successful
      //console.log('Username:', username);
      //console.log('Password:', password);

      const res = await signIn("credentials", {
        email: username,
        password: password,
        redirect: false,
      });

      if (res?.error) {
        //console.log(res);
        // alert("Something Went Wrong! Invalid Email or Password")
        notify2();
        setError("error");
        setRedirectToHome(false);
      } else {

        // alert on successful registration
        // alert("Login Succesful!")
        notify();

        // Set state to trigger redirection
        setRedirectToHome(true);
      }

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
      window.location.href = '/'; // Replace with your desired URL
    }
  }, [redirectToHome]);



  return (
    <div>
      <Navbar />
      <Breadcrumbs page_title="Login" />
      <ToastContainer />


      <div className="login py-5">
        <div className="container">
          <h2 className='mb-2 font-semibold text-4xl text-center light_black_font'>Log In</h2>
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
              <a className='text-xs' href="/forget-password">Forget Password?</a>

              <button type="submit">Login</button>

              <a className="login_register_btn" href="/register">register now</a>

              <div className="flex justify-center mt-5 light_black_font">
                Don't have an account? &nbsp; <a href="/register" className='underline font-semibold'>Register here</a>
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
