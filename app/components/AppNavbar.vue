<template>
  <nav dir="rtl" class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center gap-4">

        <div class="flex-shrink-0">
          <NuxtLink to="/" class="transition-transform hover:scale-105 block">
            <img src="/logo.png" alt="Logo" class="h-12 sm:h-16 w-auto">
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center space-x-reverse space-x-7">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path"
            class="text-gray-600 hover:text-indigo-600 transition-all duration-200 font-bold text-sm"
            active-class="text-indigo-600">
            {{ link.name }}
          </NuxtLink>

          <NuxtLink v-if="isAdmin" to="/admin"
            class="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-black text-sm hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            لوحة التحكم
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center flex-1 max-w-xs xl:max-w-md gap-4 relative" id="search-container">
          <div class="relative w-full">
            <input v-model="searchQuery" @focus="showDropdown = true" type="text" placeholder="ابحث هنا..."
              class="block w-full pr-10 pl-4 py-2.5 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all text-sm text-right" />
            <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          <div v-if="searchQuery.trim() && showDropdown"
            class="absolute top-full right-0 left-0 mt-3 bg-white border rounded-2xl shadow-2xl overflow-hidden z-[70] max-h-80 overflow-y-auto">
            <div v-for="product in filteredProducts" :key="product.id" @click="goToProduct(product.id)"
              class="p-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 border-b last:border-0">
              <img :src="product.image" class="w-10 h-10 rounded-lg object-cover">
              <span class="text-sm font-bold">{{ product.title }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">

          <button v-if="isAdmin" @click="logout"
            class="hidden lg:flex p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all items-center gap-1 group"
            title="تسجيل الخروج">
            <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>

          <NuxtLink to="/cart" class="p-2.5 text-gray-700 hover:bg-indigo-50 rounded-xl transition-all relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            <span v-if="cartItemsCount > 0"
              class="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {{ cartItemsCount }}
            </span>
          </NuxtLink>

          <button @click="isOpen = true"
            class="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-[100] lg:hidden">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="isOpen = false"></div>

        <div
          class="absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
          <div class="flex justify-between items-center mb-8">
            <span class="font-black text-xl text-indigo-600">القائمة</span>
            <button @click="isOpen = false" class="p-2 text-gray-400 hover:text-black"><svg class="w-6 h-6" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-width="2" />
              </svg></button>
          </div>

          <div class="space-y-2 flex-1">
            <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="isOpen = false"
              class="block p-4 rounded-2xl font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              {{ link.name }}
            </NuxtLink>

            <hr v-if="isAdmin" class="my-4 border-gray-50">

            <NuxtLink v-if="isAdmin" to="/admin" @click="isOpen = false"
              class="block p-4 rounded-2xl font-black bg-red-50 text-red-600 border border-red-100">
              ⚙️ لوحة التحكم
            </NuxtLink>
          </div>

          <div v-if="isAdmin" class="mt-auto border-t pt-4">
            <button @click="logout" class="w-full p-4 text-center text-gray-400 font-bold hover:text-red-500">تسجيل
              الخروج</button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
const isOpen = ref(false)
const isAdmin = useCookie('is_admin')
const searchQuery = ref('')
const showDropdown = ref(false)

const { data: productsData } = await useFetch('/api/products')
const allProducts = computed(() => productsData.value || [])

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allProducts.value.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5)
})

const goToProduct = (id) => {
  showDropdown.value = false; searchQuery.value = ''; navigateTo(`/product/${id}`)
}

const logout = () => { isAdmin.value = null; navigateTo('/'); isOpen.value = false }

const cartItemsCount = ref(0)
onMounted(() => {
  const update = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cartItemsCount.value = cart.length
  }
  update(); setInterval(update, 1000)
  window.addEventListener('click', (e) => { if (!e.target.closest('#search-container')) showDropdown.value = false })
})

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'المنتجات', path: '/products' },
  { name: 'من نحن؟', path: '/about' },
  { name: 'العروض', path: '/offers' },
]
</script>