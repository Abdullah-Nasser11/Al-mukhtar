// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET || 'product-images',
    public: {
      supabaseUrl: process.env.SUPABASE_URL
    }
  },
  // إضافة قواعد التوجيه هنا
  routeRules: {
    '/admin/**': { ssr: false }
  },

  nitro: {
    preset: "static"
  },

  modules: ['@nuxtjs/tailwindcss'],

})
