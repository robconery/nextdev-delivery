# Scripts

This directory contains utility scripts for managing the delivery application.

## Products Script

The `products.js` script helps you sync products to Stripe and manage payment links.

### Usage

```bash
# Sync all products to Stripe (creates products, prices, and payment links)
node scripts/products.js sync

# List all existing products and their payment links
node scripts/products.js list
```

### Features

- **Product Management**: Creates or updates Stripe products with metadata, features, and images
- **Price Management**: Creates new prices and deactivates old ones (Stripe doesn't allow price updates)
- **Payment Links**: Automatically creates payment links that redirect to your checkout success page
- **Duplicate Prevention**: Uses SKU metadata to prevent duplicate products
- **Error Handling**: Continues processing other products if one fails

### Product Configuration

Edit the `products` array in the script to define your products:

```javascript
{
  "name": "Product Name",
  "description": "Product description",
  "metadata": {
    "filename": "download-file.zip",  // Used for fulfillment
    "sku": "UNIQUE-SKU-001",         // Unique identifier
    "size": "100MB",
    "description": "Product details"
  },
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "images": [
    "https://example.com/product-image.jpg"
  ],
  "price": 9900,      // Price in cents ($99.00)
  "currency": "usd"
}
```

### Important Notes

- Prices are specified in cents (e.g., 9900 = $99.00)
- The `filename` in metadata is crucial for the fulfillment process
- SKUs must be unique across all products
- Images should be publicly accessible URLs
- Payment links automatically redirect to `/checkout/thanks?session_id={CHECKOUT_SESSION_ID}`

### Environment Variables Required

Make sure your `.env` file includes:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `BASE_URL`: Your application's base URL (for payment link redirects)
