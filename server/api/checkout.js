
import {getCheckout} from "../lib/stripe";
import { getDownloadUrl } from "../lib/firebase";

export default defineEventHandler(async (event) => {
  //get the session id from the query
  const { id } = getQuery(event);
  
  //do we have an id?
  if (!id) {
    //return a 400 error
    return { error: 'No session id provided' };
  }

  const res = await getCheckout(id);
  //check if the session is valid
  if (res.error) {
    //return a 400 error
    return { error: "Invalid checkout" };
  }
  //does the checkout have metadata?

  if(res.product && res.product.metadata) {

    //if this product is more than 24 hours old, the link is expired
    const HOURS_24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = Date.now(); // cleaner than new Date().getTime()
    const created = parseInt(res.created) * 1000; // convert to milliseconds

    //console.log(now, created, now - created, HOURS_24);
    const isExpired = (now - created) > HOURS_24;
    res.fulfillment = {
      file: res.product.metadata.file,
      size: res.product.metadata.size || "0",
      description:
        res.product.metadata.description || "Your download",
    };
    if (isExpired) {
      res.fulfillment.expired = true;
    }else{
      res.fulfillment = {
        file: res.product.metadata.file,
        size: res.product.metadata.size || "0",
        description:
          res.product.metadata.description || "Your download",
      };
      res.fulfillment.download_url = await getDownloadUrl(
        res.fulfillment.file
      );
    }

  }else {
    res.fulfillment = {}
  }
  return res;
})
