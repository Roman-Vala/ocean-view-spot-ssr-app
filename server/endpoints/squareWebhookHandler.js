import { updateOrderStatus } from "../../db/orders.js";


export default async function squareWebhookHandler(req, res) {

  const event = req.body;
  // console.log(event);

  try {
    switch (event.type) {
      case 'payment.updated': {
        const payment = event.data.object.payment;

        if (payment.status === 'COMPLETED') {
          // await handleSuccessfulPayment(payment);
          await updateOrderStatus(payment.order_id,{status:payment.status})
          console.log('payment status COMPLETED');
        }

        break;
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

