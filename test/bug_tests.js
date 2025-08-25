import { Email } from "../server/mail/email.js";

const checkout = {
    id: 'cs_live_b110w7eVsNk2xHgVZvDSmgIIOGx1LzrJlWPebRCGsxGjBK2tZ9vZb6UliE',
    object: 'checkout.session',
    adaptive_pricing: { enabled: true },
    after_expiration: null,
    allow_promotion_codes: true,
    amount_subtotal: 12900,
    amount_total: 9675,
    automatic_tax: { enabled: false, liability: null, provider: null, status: null },
    billing_address_collection: 'required',
    cancel_url: 'https://stripe.com',
    client_reference_id: null,
    client_secret: null,
    collected_information: { shipping_details: null },
    consent: null,
    consent_collection: {
      payment_method_reuse_agreement: null,
      promotions: 'none',
      terms_of_service: 'none'
    },
    created: 1755533714,
    currency: 'usd',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
      after_submit: null,
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null
    },
    customer: 'cus_StIJ0klJRsFfce',
    customer_creation: 'if_required',
    customer_details: {
      address: [Object],
      email: 'sheldon@tooshel.com',
      name: 'Sheldon McGee',
      phone: null,
      tax_exempt: 'none',
      tax_ids: []
    },
    customer_email: null,
    discounts: [ [Object] ],
    expires_at: 1755620113,
    invoice: 'in_1RxVjEGAZKGRiRflhO4CdqnL',
    invoice_creation: { enabled: true, invoice_data: [Object] },
    line_items: {
      object: 'list',
      data: [Array],
      has_more: false,
      url: '/v1/checkout/sessions/cs_live_b110w7eVsNk2xHgVZvDSmgIIOGx1LzrJlWPebRCGsxGjBK2tZ9vZb6UliE/line_items'
    },
    livemode: true,
    locale: 'auto',
    metadata: {
      emailSent: '2025-08-18T16:16:19.066Z',
      fulfilled: 'true',
      number: 'RC-vZb6UliE'
    },
    mode: 'payment',
    origin_context: null,
    payment_intent: 'pi_3RxVjAGAZKGRiRfl0heay5CP',
    payment_link: 'plink_1RuIx5GAZKGRiRflo1dn4v5j',
    payment_method_collection: 'if_required',
    payment_method_configuration_details: { id: 'pmc_1RcsdPGAZKGRiRflZ7dpqAIM', parent: null },
    payment_method_options: {},
    payment_method_types: [ 'card', 'klarna', 'link', 'cashapp', 'amazon_pay' ],
    payment_status: 'paid',
    permissions: null,
    phone_number_collection: { enabled: false },
    recovered_from: null,
    saved_payment_method_options: {
      allow_redisplay_filters: [Array],
      payment_method_remove: 'disabled',
      payment_method_save: null
    },
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: 'auto',
    subscription: null,
    success_url: 'https://app.thenext.dev/checkout/thanks?id={CHECKOUT_SESSION_ID}',
    tax_id_collection: { enabled: true, required: 'never' },
    total_details: { amount_discount: 3225, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'hosted',
    url: null,
    wallet_options: null,
    product: {
      id: 'prod_Sl9QoSV6gQYbqx',
      object: 'product',
      active: true,
      attributes: [],
      created: 1753655558,
      default_price: 'price_1Rpd7SGAZKGRiRflnxPnxqYO',
      description: 'Kick start your understanding of AI and learn how to have it help you without getting in your way or creating "crap code". You get 4 sessions with 12 total labs that you can do at your own pace. In addition, there is just over 90 minutes of video walkthrough to help you out.',
      images: [Array],
      livemode: true,
      marketing_features: [],
      metadata: [Object],
      name: 'AI for Developers with Deadlines',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      type: 'service',
      unit_label: null,
      updated: 1755463570,
      url: null
    },
    number: 'RC-vZb6UliE',
    fulfillment: {
      file: 'ai-deadlines-personal.zip',
      number: 'RC-vZb6UliE',
      size: '3.6G',
      description: 'Your download',
      download_url: 'https://storage.googleapis.com/the-next-dev.firebasestorage.app/ai-deadlines-personal.zip?GoogleAccessId=firebase-adminsdk-fbsvc%40the-next-dev.iam.gserviceaccount.com&Expires=1756149172&Signature=A9ZljXJV7aKOK9PF3LVcBclsyO1UEVuqQQ9iVqj6Qlo8A2smycCn8VHWy8ezMcuiJH1k%2FxYPsdmQKGXcw7NoAmiX69aUzr7AucwzZEBS6So%2Fh95n7EgBgO5Zrlsni95MCuLrt3o2PqDWblyVN%2FdfGIRRBNhmnGd7qPhP3I8XO9cuoxfRhGp6uv4igGGWWRG9e6oA4X95chtIWhzpgNBLK3dx4XHbXAGsVT%2Bf93o4vU9QPy3LT4VnYUT2BUyn9RGf19%2Bww1peA2U%2BFUHqIBQy6A7A%2BL9k6JZ1kbHaSi2110%2BXnzoSdJghxgC%2FgweSag8nuXRFzkf%2Fy4ezIVmjDiTVaQ%3D%3D'
    }
};

describe("Email Template Tests", () => {
  
  it("should render tooshel's email", async () => {
    const email = new Email({
      template: "ai-deadlines-personal",
      email: "robconery@gmail.com",
      data: {
        data: {checkout}
      },
  });
    const res = await email.send();
    console.log(res);
  });
});
