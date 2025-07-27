import Fulfillment from '../server/lib/fulfillment.js';
import assert from 'assert';

describe("Fulfillment", () => {
  let fulfillment;
  before(async () => {
    //this is a test session ID - you need to create a new one each time
    const id =
      "cs_test_a1x9eeqNaHSaQLPUlIuOPZQRLFPQsXpD2z3vkuNN0QkOAZFGdwkYocWahA";
    fulfillment = await Fulfillment.fromCheckout(id);
  });

  it("does its thing", async function () {
    const res = await fulfillment.go();
    assert(res.fulfillment.download_url, "No download url");
  });
});