export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'google-site-verification', content: '-MluZ2MQgs2D230KGaTD-gYlHvuD2-LGkSIxSCJzdd8' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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

  nitro: {
    preset: 'vercel'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo'
  ],

  site: {
    url: 'https://al-mukhtar.vercel.app',
    name: 'متجر المختار',
    description: 'متجر المختار - وجهتك الأولى لأفضل المنتجات والزيوت.',
    defaultLocale: 'ar',
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  }
})