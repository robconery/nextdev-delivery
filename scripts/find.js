//find a checkout based on email
import { getCheckout, searchCustomers } from "../server/lib/stripe.js";

const go = async function(){
  const customers = await searchCustomers('robconery@gmail.com');
  console.log(customers);
};
go().then(console.log);