import axios from "axios";

const secret=process.env.KIT_KEY;

if (!secret) {
  throw new Error("ConvertKit API key is not set. Please set the KIT_KEY environment variable.");
}

const post = function(stub, data={}){
  data.api_secret = secret;
  const url = `https://api.convertkit.com/v3/${stub}`
  const config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  };
  return axios.post(url, data, config);
}

export const recordPurchase = async function(checkout, products){
  const payload = {
    "transaction_id": checkout.number,
    "email_address": checkout.customer_details.email,
    "first_name": checkout.customer_details.name,
    "currency": "USD",
    "transaction_time": new Date().toISOString(),
    "subtotal": checkout.amount_total / 100, // Stripe amounts are in cents
    "tax": 0.00,
    "shipping": 0.00,
    "discount": 0,
    "total": checkout.amount_total / 100,
    "status": "paid",
    "products": []
  }

  for(let item of products){
    payload.products.push({
      "pid": item.sku,
      "lid": `${item.sku}-1`,
      "name": item.name,
      "sku": item.sku,
      "unit_price": item.price,
      "quantity": item.quantity || 1
    })
  }
  console.log("Recording purchase in ConvertKit:", payload);
  await post("purchases",payload);
  return true;
}
