// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    // Stripe
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    
    // Firebase
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
    firebaseSecretKey: process.env.FIREBASE_SECRET_KEY,
    
    // Mailgun
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunDomain: process.env.MAILGUN_DOMAIN,
  },
  nitro: {
    firebase: {
      gen: 2
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          sanitizeFileName: true,
        },
      },
    },
  },
})