<template>
  <div>
    <AppNavbar />
    <div v-if="product" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div class="max-w-6xl mx-auto">
        <button @click="$router.back()" class="mb-6 flex items-center text-gray-600 hover:text-black transition-colors">
          <span class="ml-2">←</span> العودة للمتجر
        </button>

        <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div class="flex flex-col md:flex-row">

            <div class="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center relative group">
              <div v-if="product.tag" class="absolute top-4 right-4 z-10">
                <span class="bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  {{ product.tag }}
                </span>
              </div>

                <img 
                  :key="product.id"
                  :src="product.image.startsWith('data:') || product.image.startsWith('http') || product.image.startsWith('/') ? product.image : '/' + product.image" 
                  :alt="product.title"
                  class="w-full h-auto max-h-[500px] object-contain"
                  @error="(e) => e.target.src = 'https://placehold.co/500x500?text=Error+Path'"
                />
            </div>

            <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <nav class="text-sm text-gray-400 mb-4 font-medium italic">الرئيسية / {{ product.category }}</nav>

              <h1 class="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {{ product.title }}
              </h1>

              <div class="mb-8">
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                  {{ product.description || `تجربة فريدة مع منتج عالي الجودة من فئة ${product.category}` }}
                </p>
              </div>

              <div class="flex items-center gap-4 mb-8">
                <span class="text-4xl font-black text-black">{{ product.discountPrice }}$</span>
                <span v-if="product.originalPrice > product.discountPrice" class="text-xl text-gray-400 line-through">
                  {{ product.originalPrice }}$
                </span>
                <span v-if="product.originalPrice > product.discountPrice"
                  class="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold">
                  خصم {{ Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100) }}%
                </span>
              </div>

              <div class="mb-8">
                <h3 class="font-bold mb-3 text-gray-800">الكمية:</h3>
                <div class="flex items-center border-2 border-gray-100 bg-gray-50 rounded-2xl p-1 w-fit">
                  <button @click="quantity > 1 ? quantity-- : null"
                    class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="w-12 text-center text-lg font-bold select-none">{{ quantity }}</span>
                  <button @click="quantity++"
                    class="w-10 h-10 flex items-center justify-center bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                @click="addToCart"
                class="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all active:scale-95">
                إضافة إلى السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center bg-white">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p class="text-gray-500 font-medium">جاري جلب تفاصيل المنتج...</p>
      </div>
    </div>
  </div>
  <transition name="fade">
  <div v-if="showNotification" class="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
    <span class="text-xl">✅</span>
    <p class="font-bold">تم إضافة المنتج إلى السلة</p>
  </div>
</transition>
</template>

<script setup>
const route = useRoute()
const productId = route.params.id


const { data: allProducts } = await useFetch('/api/products')

const product = computed(() => {
  return allProducts.value?.find(p => p.id == productId) || null
})

const quantity = ref(1)

const showNotification = ref(false) // متغير التحكم في ظهور الإشعار

const addToCart = () => {
  // نتحقق أولاً من وجود المنتج لتجنب الأخطاء
  if (!product.value) return 

  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  
  const item = {
    id: product.value.id,
    title: product.value.title,
    price: product.value.discountPrice,
    image: product.value.image,
    quantity: quantity.value
  }

  const existingItem = cart.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  
  // تفعيل الإشعار
  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}
</script>

<style scoped>
/* أي كود CSS يجب أن يكون هنا خارج الـ template */
.footer-link {
  @apply text-gray-500 text-sm hover:text-indigo-600 hover:pr-2 transition-all duration-300 block;
}
</style>