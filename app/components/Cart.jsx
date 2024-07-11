'use client'
import React, { useState, useEffect } from 'react';


const countries = {
    USA: ['California', 'Florida', 'New York'],
    Canada: ['Alberta', 'Ontario', 'Quebec'],
    India: ['Delhi', 'Maharashtra', 'Karnataka']
};

const Cart = () => {

    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [showCouponInput, setShowCouponInput] = useState(false);

    useEffect(() => {                    // to change the state based on selected country
        if (selectedCountry) {
            setStates(countries[selectedCountry]);
            setSelectedState('');
        }
    }, [selectedCountry]);

    const handleCountryChange = (e) => {      // country selection
        setSelectedCountry(e.target.value);
    };

    const handleStateChange = (e) => {        // state selection
        setSelectedState(e.target.value);
    };

    const handleCouponCheckboxChange = () => {   // to toggle coupon code based on checkbox click
        setShowCouponInput(!showCouponInput);
    };


    return (
        <div>

            <div className="cart_page">
                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="cart_page_right p-3">
                                <h3 className=''>Summary</h3>
                                <h3 className='text-xl font-semibold text-black mt-2 mb-3'>Estimate Shipping</h3>

                                <small className='light_black_font'>Enter your destination to get a shipping  estimate</small>

                                <form>
                                    <div>
                                        <label htmlFor="country" className='text-sm font-semibold mt-4'>Country<span className='asterik'>*</span></label>
                                        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                                            <option value="">Select a country</option>
                                            {Object.keys(countries).map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="state" className='text-sm font-semibold mt-4'>State/Province</label>
                                        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                                            <option value="">Select country first</option>
                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="postcode" className='text-sm font-semibold mt-4'>Zip/Postal Code</label>
                                        <input type="text" placeholder='eg. 123456' name='postcode' id='postcode' />
                                    </div>

                                    <div>
                                        <div className="flex justify-between align-middle">
                                            <label htmlFor="coupon" className='text-sm font-semibold mt-4'>Have a Coupon Code?</label>
                                            <input
                                                type="checkbox"
                                                id="coupon-checkbox"
                                                onChange={handleCouponCheckboxChange}
                                                checked={showCouponInput}
                                            />
                                        </div>
                                        {showCouponInput && (
                                            <input
                                                type="text"
                                                id="coupon"
                                                placeholder="eg. GIFT100"
                                            />
                                        )}
                                    </div>

                                    <div className='total_amount py-3 mt-5'>
                                        <div className='text-sm font-semibold'>Total Amount</div>
                                        <div className="font-semibold">₹1190</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>


        </div>
    )
}

export default Cart
