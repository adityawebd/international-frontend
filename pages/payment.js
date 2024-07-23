import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Payment() {
    const [formData, setFormData] = useState({
        amount: '',
        purpose: '',
        buyer_name: '',
        email: '',
        phone: ''
    });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-payment', formData);
            const paymentRequest = response.data;
            console.log(paymentRequest);

            

            console.log("long url ",paymentRequest.payment_request.longurl);
            const longurl = paymentRequest.payment_request.longurl;
            window.location.href = longurl; // Redirect to Instamojo payment page
        } catch (error) {
            setPaymentStatus('Payment request failed. Please try again.');
            console.error('Error creating payment request:', error);
        }
    };

    return (
        <div>
            <h1>Payment Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Purpose:</label>
                    <input
                        type="text"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Buyer Name:</label>
                    <input
                        type="text"
                        name="buyer_name"
                        value={formData.buyer_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Payment</button>
            </form>
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
}
