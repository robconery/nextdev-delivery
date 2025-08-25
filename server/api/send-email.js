import {getCheckout} from "../lib/stripe.js";
import {getDownloadUrl}  from '../lib/firebase.js';
import { Email } from '../mail/email.js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body;
  const checkout = await getCheckout(id);


  if (!checkout) {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Checkout not found' }));
  }
  console.log('Checkout found:', checkout.id);
  checkout.fulfillment = {
    file: checkout.product.metadata.file,
    number: checkout.number,
    size: checkout.product.metadata.size || "0",
    description:
      checkout.product.metadata.description || "Your download",
  };

  checkout.fulfillment.download_url = await getDownloadUrl(
    checkout.fulfillment.file
  );
  console.log('Fulfillment info:', checkout.fulfillment);
  const payload = {data: checkout};
  console.log('Payload prepared:', payload);
  const email = new Email({
    template: "checkout",
    email: checkout.customer_details.email,
    payload
  });
  await email.send();
  return { success: true };
})
