import Stripe from 'stripe';
import {readRawBody, getHeader } from "h3";
import dotenv from 'dotenv'
dotenv.config();
let stripeKey = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(stripeKey);

export const searchCustomers = async (query) => {
  try {
    const customers = await stripe.customers.list({
      email: query,
      limit: 5,
    });
    return customers.data;
  } catch (error) {
    console.error('Error searching customers:', error);
    return[]
  }
}
export const findUserByEmail = async (email) => {
  try {
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });
    if (customers.data.length > 0) {
      return customers.data[0];
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const validateWebhook = async (event) => {
  const body = await readRawBody(event, false);
  const signature = getHeader(event, 'stripe-signature');

  if (!body) {
    return { error: 'Invalid request body' }
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' }
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      "whsec_3OfmLq1kmtH3p86kh51jVknYKTxdZsS6"
    );
    return stripeEvent;
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: `Webhook Error: ${err.message}`,
    });
  }
}

export const getInvoice = async (id) => {
  try {
    const invoice = await stripe.invoices.retrieve(id);
    return invoice;
  } catch (error) {
    console.error('Error retrieving invoice:', error);
    throw error;
  }
}

export const getCheckout = async (id) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items', 'customer_details'],
    });
    //get the product details
    session.product = await stripe.products.retrieve(session.line_items.data[0].price.product);
    //get the invoice details
    // let invoice = null;
    // if (session.invoice) {
    //   session.invoice = await stripe.invoices.retrieve(session.invoice);
    // }
    session.number = "RC-" //get the last 8 digits of the session.id
      + session.id.slice(-8);
    return session;
  } catch (error) {
    console.error('Error retrieving checkout session:', id);
    throw error;
  }
}
export const getProduct = async (id) => {
  try {
    const product = await stripe.products.retrieve(id);
    return product;
  } catch (error) {
    console.error('Error retrieving product:', error);
    throw error;
  }
}
export const updateCheckout = async (id, data) => {
  try {
    const session = await stripe.checkout.sessions.update(id, data);
    return session;
  } catch (error) {
    console.error('Error updating checkout session:', error);
    throw error;
  }
}