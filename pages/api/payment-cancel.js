export default (req, res) => {
    if (req.method === 'GET') {
        const paymentId = req.query.payment_id;
        const paymentRequestId = req.query.payment_request_id;

        // Handle the payment cancellation logic here
        res.status(200).send('Payment was canceled.');
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
