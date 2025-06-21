
import crypto from 'crypto';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (expectedSignature === signature) {
    console.log('✅ Payment verified:', req.body);
    return res.status(200).json({ status: 'success' });
  } else {
    console.log('❌ Invalid signature');
    return res.status(400).json({ status: 'invalid signature' });
  }
}
