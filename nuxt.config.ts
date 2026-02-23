// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  
  // إضافة قواعد التوجيه هنا
  routeRules: {
    '/admin/**': { ssr: false } 
  },

  nitro: {
    preset: "static"
  },
  
  modules: ['@nuxtjs/tailwindcss'],
})
