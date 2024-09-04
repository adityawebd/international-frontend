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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [orderData, setOrderData] = useState([]);


    let total = 0;
    if (cart) {
        total = cart.reduce((acc, product) => acc + product.discountedPrice * (product.quantity || 0), 0);
    }

    // const [formData, setFormData] = useState({
    //     amount: '',
    //     purpose: 'testing',
    //     buyer_name: '',
    //     email: '',
    //     phone: ''
    // });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const router = useRouter();


    const handleCouponCheckboxChange = () => {   // to toggle coupon code based on checkbox click
        setShowCouponInput(!showCouponInput);
    };

    // console.log("cart is",cart)

    // useEffect(() => {
    //     const totalAmount = cart ? cart.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0) : 0;
    //     if (session) {
    //         setFormData({
    //             ...formData,
    //             amount: totalAmount.toString(),
    //             buyer_name: session.user?.name || '',
    //             email: session.user?.email || '',
    //             phone: session.user?.number || '',
    //             cart:cart || '',
    //             // quentity: cart[0]?.quantity || '',
    //             // title: cart[0]?.title || '',
    //             // sku: cart[0]?.sku || '',
    //             Weight: cart[0]?.property?.Weight || '',
    //             // images: cart[0]?.images[0] || '',
    //             address: session.user?.address || '',
    //             city: session.user.city || '',
    //             postalCode: session.user.postalCode || '',
    //             country: session.user.country || '',
    //             region: session.user.region || '',

    //         });
    //     }
    // }, [cart, session]);


    const [formData, setFormData] = useState({
        
        buyer_name: '',
        email: '',
        phone: '',
        cart: [],
        Weight: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        region: '',
    });

    useEffect(() => {
        const totalAmount = cart ? cart.reduce((acc, product) => acc + product.discountedPrice * (product.quantity || 0), 0) : 0;
        if (session) {
            setFormData(prevFormData => ({
                ...prevFormData,
                amount:  totalAmount.toString(),
                buyer_name: prevFormData.buyer_name || session.user?.name || '',
                email: prevFormData.email || session.user?.email || '',
                phone: prevFormData.phone || session.user?.number || '',
                cart: cart || prevFormData.cart,
                Weight: prevFormData.Weight || cart[0]?.property?.Weight || '',
                address: prevFormData.address || session.user?.address || '',
                city: prevFormData.city || session.user?.city || '',
                postalCode: prevFormData.postalCode || session.user?.postalCode || '',
                country: prevFormData.country || session.user?.country || '',
                region: prevFormData.region || session.user?.region || '',
            }));
        }
    }, [cart, session]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // console.log("data in cart",cart)

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!session) {
            window.location.href = '/login'; // Redirects to login page
        } else {
            try {
                const response = await axios.post('/api/create-payment', formData);
                const paymentRequest = response.data;
                // console.log(paymentRequest);

                const longurl = paymentRequest.payment_request.longurl;
                window.location.href = longurl; // Redirect to Instamojo payment page
            } catch (error) {
                setPaymentStatus('Payment request failed. Please try again.');
                console.error('Error creating payment request:', error);
            }
        }
    };


    const handleCheckoutCOD = async (e) => {
        e.preventDefault();

        // window.location.href = '/create-order',formData;
        if (!session) {
            window.location.href = '/login'; // Redirects to login page
        } else {
            try {
                const response = await axios.post('/api/create-oreder', formData);
                const paymentRequest = response.data.order;
                setOrderData(response.data.order)

                const longurl = paymentRequest.payment_request.longurl;
                window.location.href = longurl; // Redirect to Instamojo payment page
            } catch (error) {
                setPaymentStatus('Payment request failed. Please try again.');
                console.error('Error creating payment request:', error);
            }
            setIsModalOpen(true); // Show the modal
        }
    };


    // console.log("delevry ressponce is ",orderData);

    // Modal Component
    const Modal = ({ isOpen, onClose }) => {

        if (!isOpen) return null;


        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg w-10/12">
                    <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
                    <div className="container-sm ">
                        <div className="flex flex-col justify-center items-center ">
                            <div className="text-lg md:text-xl lg:text-2xl font-bold">Thank You for Ordering:</div>

                            {/* Table to display order details */}
                            <div className="w-full overflow-x-auto mt-4">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Order ID</th>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Channel Order ID</th>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Shipment ID</th>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Courier Name</th>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-2 md:px-6 py-2 md:py-3 border-b text-left text-xs md:text-sm font-medium text-gray-700">Status Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {orderData.map((order, index) => ( */}
                                        <tr>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.order_id}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.channel_order_id}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.shipment_id}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.courier_name || 'N/A'}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.status}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 border-b text-xs md:text-sm text-gray-700">{orderData.status_code || 'N/A'}</td>
                                        </tr>
                                        {/* ))} */}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="mr-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                            onClick={onClose}  // Replace with COD logic if needed
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
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
                                    <li className="flex justify-between items-center gap-4 mb-2 shadow-md p-4 w-full overflow-x-auto">
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
                                        <div className="cart_btns flex justify-between max-sm:flex-col text-center">
                                            <a className='mb-2' href="/">Continue Shopping</a>
                                            <button type="button" className="mb-2" onClick={handleCheckout}>Check Out</button>
                                            <button type="button" className="mb-2" onClick={handleCheckoutCOD}>Cash on Delivery</button>
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

                                {/* <form>
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
                                            <>

                                                <input
                                                    type="text"
                                                    id="coupon"
                                                    placeholder="eg. GIFT100"
                                                />
                                                <button type="button" className='bg-green-700 text-white p-2 rounded-lg'>Apply</button>
                                            </>
                                        )}
                                    </div>

                                    <div className='total_amount py-3 mt-5'>
                                        <div className='text-sm font-semibold'>Total Amount</div>
                                        <div className="font-semibold">₹{total}</div>
                                    </div>
                                </form> */}

                                <form>
                                    <div>
                                        <label htmlFor="country" className='text-sm font-semibold mt-4'>
                                            Country<span className='asterik'>*</span>
                                        </label>
                                        <input 
                                        required
                                            type="text"
                                            name="country"
                                            placeholder="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        />
                                        {/* <select
                                            name="country"
                                            id="ec-cart-select-country"
                                            className="ec-cart-select"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a country</option>
                                            <option value={session?.user.country}>INDIA</option>
                                        </select> */}
                                    </div>
                                    <div>
                                        <label htmlFor="region" className='text-sm font-semibold mt-4'>
                                            State/Province<span className='asterik'>*</span>
                                        </label>
                                        <input
                                        required
                                            type="text"
                                            name="region"
                                            placeholder="region"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                        />
                                        {/* <select
                                            name="region"
                                            id="ec-cart-select-state"
                                            className="ec-cart-select"
                                            value={formData.region}
                                            onChange={handleInputChange}
                                        >
                                            <option value={session?.user.region}>{session?.user.region}</option>
                                        </select> */}
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className='text-sm font-semibold mt-4'>
                                            Address Line<span className='asterik'>*</span>
                                        </label>
                                        <input
                                        required
                                            type="text"
                                            name="address"
                                            placeholder="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className='text-sm font-semibold mt-4'>
                                            Zip/Postal Code<span className='asterik'>*</span>
                                        </label>
                                        <input
                                        required
                                            type="text"
                                            name="postalCode"
                                            placeholder="Zip/Postal Code"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between align-middle">
                                            <label htmlFor="coupon" className='text-sm font-semibold mt-4'>
                                                Have a Coupon Code?
                                            </label>
                                            <input
                                                type="checkbox"
                                                id="coupon-checkbox"
                                                onChange={handleCouponCheckboxChange}
                                                checked={showCouponInput}
                                            />
                                        </div>
                                        {showCouponInput && (
                                            <>
                                                <input
                                                    type="text"
                                                    id="coupon"
                                                    placeholder="eg. GIFT100"
                                                />
                                                <button type="button" className='bg-green-700 text-white p-2 rounded-lg'>
                                                    Apply
                                                </button>
                                            </>
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

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Cart;
