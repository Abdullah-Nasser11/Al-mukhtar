<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans" dir="rtl">
    
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>

    <div class="max-w-md w-full p-1 border border-white/10 rounded-[2.5rem] bg-white/5 backdrop-blur-xl shadow-2xl z-10 mx-4">
      <div class="bg-white rounded-[2.3rem] p-8 lg:p-10 shadow-inner">
        
        <div class="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div class="text-center mb-10">
          <h2 class="text-3xl font-black text-slate-900 mb-2">مرحباً بك</h2>
          <p class="text-gray-500 font-medium text-sm">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
        </div>

        <div class="space-y-6">
          <div class="relative group">
            <span class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </span>
            <input 
              v-model="password" 
              type="password" 
              placeholder="كلمة مرور المسؤول" 
              class="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-600 focus:bg-white transition-all duration-300 font-bold placeholder:font-medium tracking-widest"
              @keyup.enter="handleLogin"
            />
          </div>

          <button 
            @click="handleLogin" 
            class="group relative w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg overflow-hidden transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 flex items-center justify-center gap-2">
              دخول النظام
              <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </button>
        </div>

        <transition name="shake">
          <div v-if="error" class="mt-6 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 justify-center">
            <span class="text-red-600 text-sm font-bold">عذراً، كلمة المرور غير صحيحة!</span>
          </div>
        </transition>

        <div class="mt-8 text-center">
          <NuxtLink to="/" class="text-gray-400 text-sm hover:text-indigo-600 transition-colors font-medium">العودة للرئيسية</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const error = ref(false)

// تعريف الكوكي مع إضافة خيار secure لضمان العمل على روابط https الخاصة بـ Netlify
const isAdminCookie = useCookie('is_admin', {
  maxAge: 60 * 60 * 24, 
  path: '/',
  watch: true,
  sameSite: 'lax'
})

const handleLogin = () => {
  if (password.value === 'admin123') {
    // 1. حفظ الحالة في الكوكيز
    isAdminCookie.value = 'true'
    
    // 2. كخطوة احتياطية، نحفظها في localStorage لضمان قراءتها من الـ Middleware
    if (process.client) {
      localStorage.setItem('is_admin', 'true')
    }

    // 3. التوجيه باستخدام window.location لضمان تجاوز أي تعليق في التوجيه الداخلي
    setTimeout(() => {
      window.location.href = '/admin'
    }, 200)
    
  } else {
    error.value = true
    setTimeout(() => error.value = false, 3000)
    password.value = ''
  }
}
</script>

<style scoped>
/* حركة الاهتزاز عند الخطأ */
.shake-enter-active {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>