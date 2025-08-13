import assert from 'assert';
import {getDownloadUrl}  from './firebase.js';
import { Email } from '../mail/index.js';
import {updateCheckout, getCheckout} from './stripe.js';
class fulfillment {
  constructor(checkout) {
    this.checkout = checkout;

    //we need a product, at the very least
    assert(this.checkout.product, "No product found");
    assert(this.checkout.product.metadata.file, "Can't fulfill without a file");
  }
  static async fromCheckout(id) {
    //get the checkout session
    const checkout = await getCheckout(id);
    //return 
    return new fulfillment(checkout);
  }
  async go() {
    //is there metadata on the checkout session?
    
    this.checkout.fulfillment = {
      file: this.checkout.product.metadata.file,
      sku: this.checkout.product.metadata.sku,
      number: this.checkout.number,
      size: this.checkout.product.metadata.size || "0",
      description:
        this.checkout.product.metadata.description || "Your download",
    };

    this.checkout.fulfillment.download_url = await getDownloadUrl(
      this.checkout.fulfillment.file
    );

    const email = new Email({
      template: this.checkout.fulfillment.sku,
      email: this.checkout.customer_details.email,
      data: {
        data: {checkout: this.checkout}
      },
    });

    await email.send();

    await updateCheckout(this.checkout.id, {
      metadata: {
        emailSent: new Date().toISOString(),
        fulfilled: true,
        number: this.checkout.number,
      },
    });
    return this.checkout;
  }
}

export default fulfillment;