This is a digital delivery application written in Nuxt/Node.js. It works hand in hand with Stripe - specifically Stripe Checkout.

This app will need to:

- Receive a redirect from Stripe Checkout, take in the session ID and use it to retrieve the session from Stripe.
- Once retrieved, the app will get the product information as well, including the `filename` from the metadata.
- The application will then construct an expiring URL for AWS S3 using the `filename`.
- The checkout session, customer email, customer stripe id, and the date will be stored in firestore.
- An email will be sent to the customer with the download link.
- The email will be sent using Mailgun and will include the product name, download link, and a thank you message.
- The app will also need to handle errors and edge cases, such as invalid session IDs or expired URLs.
- The app will be deployed to Firebase hosting and will need to be configured to work with Firebase functions.

## Code Style

This project uses JavaScript with the following styles:

- All models will be classes with singular naming (i.e. `User` for the `users` table)
- All code files will be lower case with underscores.
- Markdown files will be lower case with hyphens.
- All application logic will go in the `lib` directory. Copilot should NEVER generate the code for logic. Only COMMENTS as to what should go where.
- All database-related stuff will go in the `db` directory (models, schema, SQLite files)
- All configuration will be done with environment variables, using a `.env` file.
