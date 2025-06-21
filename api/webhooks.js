import crypto from 'crypto';

export default async function handler(req, res) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (expectedSignature === signature) {
    const payment = req.body.payload.payment.entity;
    console.log('✅ Payment confirmed:', payment);

    // You can now send WhatsApp message or store order in DB here
    return res.status(200).json({ status: 'success' });
  } else {
    console.log('❌ Invalid webhook signature');
    return res.status(400).json({ status: 'invalid signature' });
  }
}
// https://RBBACKEND.vercel.app/api/create-order
// https://RBBACKEND.vercel.app/api/webhooks
