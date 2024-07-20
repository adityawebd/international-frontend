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
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Cart</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="ec-breadcrumb-item active">Cart</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-cart-leftside col-lg-8 col-md-12">
                            <div className="ec-cart-content">
                                <div className="ec-cart-inner">
                                    <div className="row">
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
                                                    <div className="ec-cart-update-bottom">
                                                        <a href="/">Continue Shopping</a>
                                                        <button type="button" className="btn btn-primary" onClick={handleCheckout}>Check Out</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ec-cart-rightside col-lg-4 col-md-12">
                            <div className="ec-sidebar-wrap">
                                <div className="ec-sidebar-block">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Summary</h3>
                                    </div>
                                    <div className="ec-sb-block-content">
                                        <h4 className="ec-ship-title">Estimate Shipping</h4>
                                        <div className="ec-cart-form">
                                            <p>Enter your destination to get a shipping estimate</p>
                                            <form action="#" method="post">
                                                <span className="ec-cart-wrap">
                                                    <label>Country *</label>
                                                    <span className="ec-cart-select-inner">
                                                        <select name="ec_cart_country" id="ec-cart-select-country" className="ec-cart-select" defaultValue={session?.user.country}>
                                                            <option value={session?.user.country}>INDIA</option>
                                                        </select>
                                                    </span>
                                                </span>
                                                <span className="ec-cart-wrap">
                                                    <label>State/Province</label>
                                                    <span className="ec-cart-select-inner">
                                                        <select name="ec_cart_state" id="ec-cart-select-state" className="ec-cart-select" defaultValue={1}>
                                                            <option value={session?.user.region}>{session?.user.region}</option>
                                                        </select>
                                                    </span>
                                                </span>
                                                <span className="ec-cart-wrap">
                                                    <label>Zip/Postal Code</label>
                                                    <input type="text" name="postalcode" placeholder="Zip/Postal Code" defaultValue={session?.user.postalCode} />
                                                </span>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="ec-sb-block-content">
                                        <div className="ec-cart-summary-bottom">
                                            <div className="ec-cart-summary">
                                                <div className="ec-cart-summary-total">
                                                    <span className="text-left">Total Amount</span>
                                                    <span className="text-right" id="total">₹ {total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
