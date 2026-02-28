export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // ✅ فعل SSR لأن عندك API
  ssr: true,

  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || 'product-images',
    public: {
      supabaseUrl: process.env.SUPABASE_URL
    }
  },

  routeRules: {
    '/admin/**': { ssr: false }
  },

  // ✅ مهم جداً لـ Vercel
  nitro: {
    preset: 'vercel'
  },

  modules: ['@nuxtjs/tailwindcss']
})

