<template>
  <AppNavbar />
  <div class="min-h-screen bg-[#f1f5f9] py-16 px-4 font-sans" dir="rtl">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-right">
        <div>
          <h1 class="text-4xl font-[900] text-indigo-950 mb-2 tracking-tight">حقيبة التسوق</h1>
          <p class="text-slate-500 font-medium">لديك <span class="text-indigo-600 font-black">{{ cart.length }}</span>
            منتجات مميزة</p>
        </div>
        <NuxtLink to="/"
          class="group flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-all font-bold">
          <span class="text-sm">مواصلة التسوق</span>
          <div class="bg-indigo-100 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <div v-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 space-y-4">
          <div v-for="item in cart" :key="item.id"
            class="bg-white p-6 rounded-[2.5rem] shadow-sm flex items-center gap-6 border border-white hover:shadow-xl hover:border-indigo-100 transition-all group text-right">

            <div class="bg-slate-50 rounded-3xl p-3 shrink-0 group-hover:rotate-3 transition-transform">
              <img :src="item.image" class="w-20 h-20 object-contain" />
            </div>

            <div class="flex-1">
              <h3 class="font-black text-slate-800 text-lg mb-2">{{ item.title }}</h3>
              <div class="text-indigo-600 font-black text-xl mb-3">{{ item.price }} <small
                  class="text-xs text-slate-400 font-medium">$</small></div>

              <div class="flex items-center bg-slate-100 w-fit rounded-2xl p-1 border border-slate-200">
                <button @click="updateQty(item.id, 1)"
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all font-bold">+</button>
                <span class="px-4 font-black text-slate-700">{{ item.quantity }}</span>
                <button @click="updateQty(item.id, -1)"
                  class="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all font-bold">-</button>
              </div>
            </div>

            <button @click="removeFromCart(item.id)" class="text-slate-300 hover:text-red-500 transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-indigo-950 p-8 rounded-[3rem] shadow-2xl sticky top-10 text-white text-right">
            <h2 class="font-black text-2xl mb-8 border-b border-white/10 pb-4 text-center">تأكيد الطلب</h2>

            <form @submit.prevent="openCheckoutConfirm" class="space-y-5">
              <div class="space-y-1">
                <label class="text-[10px] font-bold text-indigo-300 uppercase mr-2 tracking-widest">المستلم</label>
                <input v-model="customer.name" type="text" placeholder="الاسم الكامل" required class="modern-input" />
              </div>

              <div class="space-y-1">
                <label class="text-[10px] font-bold text-indigo-300 uppercase mr-2 tracking-widest">التواصل</label>
                <input v-model="customer.phone" type="tel" placeholder="05xxxxxxxx" required
                  class="modern-input text-left" dir="ltr" />
              </div>

              <div class="space-y-1">
                <label class="text-[10px] font-bold text-indigo-300 uppercase mr-2 tracking-widest">العنوان</label>
                <textarea v-model="customer.address" placeholder="المدينة، الحي، الشارع" required class="modern-input"
                  rows="2"></textarea>
              </div>

              <div class="bg-white/5 rounded-[2rem] p-6 mt-8">
                <div class="flex justify-between items-center mb-4">
                  <span class="text-indigo-200 text-sm">إجمالي السعر</span>
                  <span class="text-2xl font-[1000] text-emerald-400">{{ totalPrice }} <small
                      class="text-xs">$</small></span>
                </div>
                <button type="submit"
                  class="w-full bg-emerald-500 text-indigo-950 py-5 rounded-2xl font-[900] text-xl hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                  <span>إرسال عبر واتساب</span>
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-slate-100">
        <div class="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-6xl">🛍️</div>
        <h2 class="text-3xl font-black text-slate-900 mb-4">لم تضف شيئاً بعد!</h2>
        <p class="text-slate-400 mb-10 max-w-xs mx-auto font-medium">ابدأ بإضافة بعض المنتجات الرائعة لسلتك الآن</p>
        <NuxtLink to="/"
          class="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 inline-block">
          تصفح المنتجات</NuxtLink>
      </div>
    </div>
    <div v-if="showCheckoutModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-md">
  <div class="bg-white rounded-[3rem] p-8 max-w-sm w-full shadow-2xl text-center border border-indigo-100">
    <div class="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
      ✅
    </div>
    <h3 class="text-2xl font-[900] text-indigo-950 mb-3">جاهز للإرسال؟</h3>
    <p class="text-slate-500 mb-8 font-medium leading-relaxed">
      عند الضغط على تأكيد، سيتم تحويلك للواتساب وستتم عملية إفراغ السلة تلقائياً.
    </p>
    
    <div class="space-y-3">
      <button @click="confirmAndSend" class="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
        تأكيد وإرسال الطلب
      </button>
      <button @click="showCheckoutModal = false" class="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
        تراجع
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cart = ref([])
const customer = ref({ name: '', phone: '', address: '' })
const companyPhone = "963991789533"

onMounted(() => {
  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
})

const totalPrice = computed(() => {
  return cart.value.reduce((s, i) => s + (Number(i.price) * Number(i.quantity)), 0)
})

// دالة تحديث الكمية الجديدة
const updateQty = (id, change) => {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    const newQty = item.quantity + change
    if (newQty > 0) {
      item.quantity = newQty
      localStorage.setItem('cart', JSON.stringify(cart.value))
    } else {
      removeFromCart(id)
    }
  }
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const showCheckoutModal = ref(false) // حالة نافذة التأكيد


// هذه الدالة تفتح النافذة فقط ولا ترسل شيئاً بعد
const openCheckoutConfirm = () => {
  if (cart.value.length === 0) return
  showCheckoutModal.value = true
}

// هذه الدالة هي التي تنفذ الإرسال والإفراغ معاً
const confirmAndSend = () => {
  let msg = `*طلب جديد من المتجر* 🛒\n\n`;
  msg += `👤 *الاسم:* ${customer.value.name}\n`;
  msg += `📞 *الجوال:* ${customer.value.phone}\n`;
  msg += `📍 *العنوان:* ${customer.value.address}\n\n`;
  msg += `📦 *المنتجات:*\n`;
  cart.value.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.title}* (${item.quantity} قطع) - ${item.price * item.quantity} $\n`;
  });
  msg += `\n💰 *الإجمالي:* ${totalPrice.value} $`;

  const encoded = encodeURIComponent(msg);
  const url = `https://api.whatsapp.com/send?phone=${companyPhone}&text=${encoded}`;

  // 1. فتح الواتساب
  window.open(url, '_blank');

  // 2. إفراغ السلة فوراً
  cart.value = [];
  localStorage.removeItem('cart');

  // 3. إغلاق النافذة
  showCheckoutModal.value = false;
}
</script>

<style scoped>
.modern-input {
  @apply w-full bg-white/10 border border-white/5 rounded-2xl p-4 text-white focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 outline-none transition-all placeholder:text-indigo-300/50 font-medium text-right shadow-inner;
}

/* إخفاء شريط التمرير الافتراضي لشكل أنعم */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  @apply bg-indigo-200 rounded-full;
}
</style>