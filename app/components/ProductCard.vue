<template>
  <div
    class="group relative flex flex-col w-full p-3 space-y-4 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl md:max-w-sm md:p-6 md:space-y-6"
    dir="rtl">

    <NuxtLink :to="`/product/${id}`"
      class="block bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer">
      <img :src="image" alt="product-img"
        class="mx-auto duration-500 w-full h-28 object-contain p-2 transform group-hover:scale-110 md:max-w-[14rem] md:h-48 md:p-3" />
    </NuxtLink>

    <div class="flex flex-col space-y-3">
      <div class="space-y-1 text-right">
        <div v-if="tag"
          class="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white bg-black rounded-full md:px-3 md:py-1 md:text-[10px]">
          {{ tag }}
        </div>

        <NuxtLink :to="`/product/${id}`">
          <h2
            class="text-sm font-bold text-gray-800 leading-snug hover:text-indigo-600 transition-colors cursor-pointer md:text-lg">
            {{ title }}
          </h2>
        </NuxtLink>
      </div>

      <div class="flex items-center justify-between pt-1">
        <div class="flex flex-col text-right font-sans">
          <span class="line-through text-gray-400 text-xs md:text-sm">{{ originalPrice }}$</span>
          <span class="text-2xl font-black text-indigo-950 leading-none md:text-3xl">{{ discountPrice }} <small
              class="text-xs">$</small></span>
        </div>

        <button @click.stop="addToCart"
          class="relative flex items-center justify-center w-12 h-12 text-white bg-black rounded-2xl shadow-lg hover:bg-gray-600 transition-all active:scale-95 group md:w-14 md:h-14">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span
            class="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white">
            +
          </span>
        </button>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div v-if="showNotification"
      class="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
      <span class="text-xl">✅</span>
      <p class="font-bold">تم إضافة المنتج إلى السلة</p>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: { type: [Number, String], required: true },
  image: { type: String, default: 'https://via.placeholder.com/150' },
  tag: { type: String, default: 'Free Shipping' },
  title: { type: String, default: 'اسم المنتج' },
  originalPrice: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
})

const quantity = ref(1)
const showNotification = ref(false)

const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  const item = {
    id: props.id,
    title: props.title,
    price: props.discountPrice,
    image: props.image,
    quantity: quantity.value
  }

  const existingItem = cart.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  showNotification.value = true
  setTimeout(() => showNotification.value = false, 3000)
}

</script>