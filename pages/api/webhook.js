export default (req, res) => {
    if (req.method === 'POST') {
        const webhookData = req.body;

        // Handle the webhook data here
        console.log(webhookData);

        res.status(200).send('Webhook received');
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
