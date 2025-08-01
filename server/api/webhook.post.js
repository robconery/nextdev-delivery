import { defineEventHandler, readBody, readRawBody } from "h3";
import Fulfillment from "../lib/fulfillment";
import { validateWebhook, getCheckout } from "../lib/stripe";

const config = useRuntimeConfig();


export default defineEventHandler(async (event) => {
  const stripeEvent = await validateWebhook(event);
  if(stripeEvent.error) {
    //return a 400 error
    setResponseStatus(event, 400);
    return { error: stripeEvent.error };
  }

  switch (stripeEvent.type) {
    case "checkout.session.completed":
      const session = stripeEvent.data.object;
    // Then define and call a function to handle the event checkout.session.completed
      const fulfillment = await Fulfillment.fromCheckout(session.id);
      await fulfillment.go();
      break;
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  return { received: true };

});
