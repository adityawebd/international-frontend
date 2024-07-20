import axios from 'axios';

// Replace with your Instamojo API key and Auth token
const API_KEY = "a32a6bed7c7075384302a6d3c6bd0b9a";
const AUTH_TOKEN = "2aec2dfbcb690ef745d92b6b166d1222";

export default async (req, res) => {
    if (req.method === 'POST') {
        const { amount, purpose, buyer_name, email, phone } = req.body;

        const headers = {
            'X-Api-Key': API_KEY,
            'X-Auth-Token': AUTH_TOKEN
        };

        const payload = {
            amount,
            purpose,
            buyer_name,
            email,
            phone,
            redirect_url: 'http://localhost:3000/api/payment-success',
            // webhook: 'http://localhost:3000/api/webhook',
            cancel_url: 'http://localhost:3000/api/payment-cancel'
        };

        try {
            const response = await axios.post('https://www.instamojo.com/api/1.1/payment-requests/', payload, { headers });
            const paymentRequest = response.data;

            res.status(200).json(paymentRequest);
            console.log(paymentRequest)
            console.log("long url ",paymentRequest.longurl);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
