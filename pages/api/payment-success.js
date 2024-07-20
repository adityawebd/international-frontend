export default (req, res) => {
    if (req.method === 'GET') {
        const paymentId = req.query.payment_id;
        const paymentRequestId = req.query.payment_request_id;
        const paymentStatus = req.query.payment_status

        console.log("payment id:" ,paymentId,"paymentRequest Id:" , paymentRequestId,"paymentStatus:" , paymentStatus);

        // Handle the payment success logic here
        if(paymentStatus==='success') {
        res.status(200).send('Payment Successful!');
        }
        else{
            res.status(200).send('Payment Failed!');
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
