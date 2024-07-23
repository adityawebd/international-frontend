'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import CartItem from './CartItem';
import { useCartStore } from '../../stores/useCartStore';
import useFromStore from '../../hooks/useFromStore';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const [address, setAddress] = useState([]);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const { data: session } = useSession();
    const cart = useFromStore(useCartStore, (state) => state.cart);

    let total = 0;
    if (cart) {
        total = cart.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0);
    }

    const [formData, setFormData] = useState({
        amount: '',
        purpose: 'testing',
        buyer_name: '',
        email: '',
        phone: ''
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const router = useRouter();


    const handleCouponCheckboxChange = () => {   // to toggle coupon code based on checkbox click
        setShowCouponInput(!showCouponInput);
    };


    useEffect(() => {
        const totalAmount = cart ? cart.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0) : 0;
        if (session) {
            setFormData({
                ...formData,
                amount: totalAmount.toString(),
                buyer_name: session.user?.name || '',
                email: session.user?.email || '',
                phone: session.user?.number || ''
            });
        }
    }, [cart, session]);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!session) {
            window.location.href = '/login'; // Redirects to login page
        } else {
            try {
                const response = await axios.post('/api/create-payment', formData);
                const paymentRequest = response.data;
                console.log(paymentRequest);

                const longurl = paymentRequest.payment_request.longurl;
                window.location.href = longurl; // Redirect to Instamojo payment page
            } catch (error) {
                setPaymentStatus('Payment request failed. Please try again.');
                console.error('Error creating payment request:', error);
            }
        }
    };

    return (
        <div>
            <div className="cart_page">
                {/* <div className="container"> */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <form action="#">
                                <div className="table-content cart-table-content" id="table-container">
                                    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-16 py-3">Image</th>
                                                    <th scope="col" className="px-6 py-3">Product</th>
                                                    <th scope="col" className="px-6 py-3">Qty</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                    <th scope="col" className="px-6 py-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart?.map(product => (
                                                    <CartItem key={product._id} product={product} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </li>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="cart_btns flex justify-between">
                                            <a className='' href="/">Continue Shopping</a>
                                            <button type="button" className="" onClick={handleCheckout}>Check Out</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="cart_page_right p-3">
                                <h3 className=''>Summary</h3>
                                <h3 className='text-xl font-semibold text-black mt-2 mb-3'>Estimate Shipping</h3>

                                <small className='light_black_font'>Enter your destination to get a shipping  estimate</small>

                                <form>
                                    <div>
                                        <label htmlFor="country" className='text-sm font-semibold mt-4'>Country<span className='asterik'>*</span></label>
                                        <select name="ec_cart_country" id="ec-cart-select-country" className="ec-cart-select" defaultValue={session?.user.country}>
                                            <option value="">Select a country</option>
                                            <option value={session?.user.country}>
                                                INDIA
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="state" className='text-sm font-semibold mt-4'>State/Province</label>
                                        <select name="ec_cart_state" id="ec-cart-select-state" className="ec-cart-select" defaultValue={1}>
                                            <option value={session?.user.region}>{session?.user.region}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="postcode" className='text-sm font-semibold mt-4'>Zip/Postal Code</label>
                                        <input type="text" name="postalcode" placeholder="Zip/Postal Code" defaultValue={session?.user.postalCode} />
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
                                        <div className="font-semibold">₹{total}</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
