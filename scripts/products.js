import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Sample product definitions
const products = [
  {
    "name": "The Complete JavaScript Course",
    "description": "A comprehensive JavaScript course covering everything from basics to advanced concepts.",
    "metadata": {
      "filename": "javascript-course.zip",
      "sku": "JS-COURSE-001",
      "size": "150MB",
      "description": "Complete JavaScript course materials and exercises"
    },
    "features": [
      "12 hours of video content",
      "50+ coding exercises",
      "Certificate of completion",
      "Lifetime access",
      "Source code included"
    ],
    "images": [
      "https://example.com/images/js-course-cover.jpg"
    ],
    "price": 9900, // $99.00 in cents
    "currency": "usd"
  },
];

/**
 * Create or update a product in Stripe
 * @param {Object} productData - Product configuration
 * @returns {Object} Stripe product object
 */
async function createOrUpdateProduct(productData) {
  try {
    // Check if product already exists by searching metadata
    const existingProducts = await stripe.products.search({
      query: `metadata['sku']:'${productData.metadata.sku}'`,
    });

    let product;
    
    if (existingProducts.data.length > 0) {
      // Update existing product
      product = await stripe.products.update(existingProducts.data[0].id, {
        name: productData.name,
        description: productData.description,
        metadata: productData.metadata,
        images: productData.images || [],
        features: productData.features || []
      });
      console.log(`✅ Updated product: ${product.name} (${product.id})`);
    } else {
      // Create new product
      product = await stripe.products.create({
        name: productData.name,
        description: productData.description,
        metadata: productData.metadata,
        images: productData.images || [],
        features: productData.features || []
      });
      console.log(`🆕 Created product: ${product.name} (${product.id})`);
    }

    return product;
  } catch (error) {
    console.error(`❌ Error creating/updating product ${productData.name}:`, error.message);
    throw error;
  }
}

/**
 * Create or update a price for a product
 * @param {string} productId - Stripe product ID
 * @param {Object} priceData - Price configuration
 * @returns {Object} Stripe price object
 */
async function createOrUpdatePrice(productId, priceData) {
  try {
    // Check if price already exists for this product
    const existingPrices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    let price;

    if (existingPrices.data.length > 0) {
      // Deactivate old price and create new one (Stripe doesn't allow price updates)
      await stripe.prices.update(existingPrices.data[0].id, { active: false });
      console.log(`🔄 Deactivated old price for product ${productId}`);
    }

    // Create new price
    price = await stripe.prices.create({
      product: productId,
      unit_amount: priceData.price,
      currency: priceData.currency,
      metadata: {
        sku: priceData.metadata.sku
      }
    });

    console.log(`💰 Created price: ${price.unit_amount / 100} ${price.currency.toUpperCase()} (${price.id})`);
    return price;
  } catch (error) {
    console.error(`❌ Error creating price for product ${productId}:`, error.message);
    throw error;
  }
}

/**
 * Create or update a payment link for a price
 * @param {string} priceId - Stripe price ID
 * @param {Object} productData - Product configuration
 * @returns {Object} Stripe payment link object
 */
async function createOrUpdatePaymentLink(priceId, productData) {
  try {
    // Check if payment link already exists
    const existingLinks = await stripe.paymentLinks.list({
      active: true,
    });

    const existingLink = existingLinks.data.find(link => 
      link.line_items.data.some(item => item.price.id === priceId)
    );

    let paymentLink;

    if (existingLink) {
      // Update existing payment link
      paymentLink = await stripe.paymentLinks.update(existingLink.id, {
        active: true,
        metadata: {
          sku: productData.metadata.sku,
          filename: productData.metadata.filename
        }
      });
      console.log(`🔗 Updated payment link for ${productData.name}: ${paymentLink.url}`);
    } else {
      // Create new payment link
      paymentLink = await stripe.paymentLinks.create({
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        metadata: {
          sku: productData.metadata.sku,
          filename: productData.metadata.filename
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${process.env.BASE_URL || 'http://localhost:3000'}/checkout/thanks?session_id={CHECKOUT_SESSION_ID}`
          }
        }
      });
      console.log(`🆕 Created payment link for ${productData.name}: ${paymentLink.url}`);
    }

    return paymentLink;
  } catch (error) {
    console.error(`❌ Error creating payment link for ${productData.name}:`, error.message);
    throw error;
  }
}

/**
 * Sync all products to Stripe
 */
async function syncProductsToStripe() {
  console.log('🚀 Starting product sync to Stripe...\n');

  for (const productData of products) {
    try {
      console.log(`\n📦 Processing: ${productData.name}`);
      console.log('─'.repeat(50));

      // 1. Create or update product
      const product = await createOrUpdateProduct(productData);

      // 2. Create or update price
      const price = await createOrUpdatePrice(product.id, productData);

      // 3. Create or update payment link
      const paymentLink = await createOrUpdatePaymentLink(price.id, productData);

      console.log(`✅ Successfully synced: ${productData.name}`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log(`   Payment Link: ${paymentLink.url}`);

    } catch (error) {
      console.error(`❌ Failed to sync ${productData.name}:`, error.message);
      continue; // Continue with next product
    }
  }

  console.log('\n🎉 Product sync completed!');
}

/**
 * List all products and their payment links
 */
async function listProducts() {
  try {
    console.log('📋 Listing all products and payment links...\n');

    const stripeProducts = await stripe.products.list({ limit: 100 });
    const paymentLinks = await stripe.paymentLinks.list({ limit: 100 });

    for (const product of stripeProducts.data) {
      console.log(`\n📦 ${product.name} (${product.id})`);
      console.log(`   Description: ${product.description}`);
      console.log(`   Features: ${product.features?.join(', ') || 'None'}`);
      
      // Find associated prices
      const prices = await stripe.prices.list({ product: product.id });
      for (const price of prices.data) {
        console.log(`   💰 Price: ${price.unit_amount / 100} ${price.currency.toUpperCase()} (${price.id})`);
        
        // Find associated payment link
        const link = paymentLinks.data.find(link => 
          link.line_items.data.some(item => item.price.id === price.id)
        );
        
        if (link) {
          console.log(`   🔗 Payment Link: ${link.url}`);
        }
      }
      
      console.log('─'.repeat(50));
    }
  } catch (error) {
    console.error('❌ Error listing products:', error.message);
  }
}

// CLI handling
const command = process.argv[2];

switch (command) {
  case 'sync':
    syncProductsToStripe();
    break;
  case 'list':
    listProducts();
    break;
  default:
    console.log('Usage:');
    console.log('  node scripts/products.js sync  - Sync products to Stripe');
    console.log('  node scripts/products.js list  - List all products and payment links');
    break;
}