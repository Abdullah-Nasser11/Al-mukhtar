<template>
  <footer class="relative bg-white pt-24 pb-4 overflow-hidden font-sans border-t border-gray-50" dir="rtl">

    <div
      class="absolute top-0 left-0 w-96 h-96 bg-indigo-50/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0">
    </div>
    <div class="animated-blob bg-emerald-100/40 w-80 h-80 rounded-full blur-3xl opacity-60"></div>
    <div class="animated-blob-slow bg-indigo-100/50 w-[500px] h-[500px] rounded-full blur-[100px] opacity-50"></div>

    <div class="smooth-floating arrow-1 text-indigo-500/40">
      <svg class="w-8 h-8 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </div>
    <div class="smooth-floating arrow-2 text-indigo-600/30">
      <svg class="w-10 h-10 -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
      </svg>
    </div>
    <div class="smooth-floating arrow-3 text-indigo-400/50">
      <svg class="w-6 h-6 rotate-[110deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 text-center lg:text-right">
        <div class="lg:col-span-4 space-y-8 flex flex-col items-center lg:items-start">
          <NuxtLink to="/">
            <img src="/logo.png" alt="Logo"
              class="h-28 md:h-36 w-auto object-contain hover:scale-105 transition-transform duration-500">
          </NuxtLink>
          <p class="text-gray-500 text-lg leading-8 max-w-xs mx-auto lg:mx-0 font-medium">
            تجربة تسوق تتجاوز التوقعات، نختار لكم أجود زيوت العالمية.
          </p>
          <div class="flex gap-4 justify-center lg:justify-start">
            <a href="https://www.facebook.com/share/18EuwAGuSu/" target="_blank" class="social-icon-btn bg-[#1877F2] shadow-[#1877F2]/20">
              <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a href="https://www.instagram.com/3bd.nasser?igsh=MWllcGlpbmQ4Zjk2ag==" target="_blank"
              class="social-icon-btn bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-[#ee2a7b]/20">
              <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a href="https://wa.me/6283199125569" target="_blank" class="social-icon-btn bg-[#25D366] shadow-[#25D366]/20">
              <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h1 class="footer-title">الوصول السريع</h1>
          <ul class="space-y-5">
            <li>
              <NuxtLink to="/" class="link-item">الرئيسية</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="link-item font-bold text-slate-900">المتجر الكامل</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/offers" class="link-item text-red-600 font-bold">أحدث العروض</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="link-item">من نحن</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-6">
          <h1 class="footer-title">تواصل معنا مباشرة</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="branch-card group">
              <div class="flex justify-between items-center mb-6 w-full">
                <a href="https://maps.google.com" target="_blank"
                  class="bg-indigo-50 w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm hover:bg-indigo-100 transition-colors cursor-pointer group/icon"
                  title="عرض الموقع على الخريطة">
                  <svg class="w-6 h-6 text-indigo-600 group-hover/icon:scale-110 transition-transform" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </a>
                <h4 class="text-slate-900 font-black text-xl">فرع الباب</h4>
              </div>
              <p class="text-gray-500 text-sm mb-4 leading-relaxed">الباب _ طريق الراعي _ مقابل ملعب المدينة</p>
              <a href="https://wa.me/966501112222" target="_blank"
                class="whatsapp-number-box text-indigo-600 border-indigo-100 hover:bg-indigo-600">
                <span class="flex items-center gap-2">966 501 112 222</span>
              </a>
            </div>

            <div class="branch-card group">
              <div class="flex justify-between items-center mb-6 w-full">
                <a href="https://maps.google.com" target="_blank"
                  class="bg-emerald-50 w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm hover:bg-emerald-100 transition-colors cursor-pointer group/icon"
                  title="عرض الموقع على الخريطة">
                  <svg class="w-6 h-6 text-emerald-600 group-hover/icon:scale-110 transition-transform" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </a>
                <h4 class="text-slate-900 font-black text-xl">فرع حماة</h4>
              </div>
              <p class="text-gray-500 text-sm mb-4 leading-relaxed">خطاب _ طريق محردة</p>
              <a href="https://wa.me/963991789533" target="_blank"
                class="whatsapp-number-box text-emerald-600 border-emerald-100 hover:bg-emerald-600">
                <span class="flex items-center gap-2">+62-831-9912-5569</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <div class="pt-8 mt-12 border-t border-gray-100">
        <p class="text-gray-400 text-xs font-bold tracking-[2px] uppercase text-center">
          © {{ new Date().getFullYear() }} جميع الحقوق محفوظة - متجر المختار
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 1. التنسيقات العامة */
.footer-title {
  @apply text-slate-900 font-black text-sm uppercase tracking-[0.2em] mb-12 border-b-2 border-slate-100 pb-4 inline-block;
}

.link-item {
  @apply text-gray-500 hover:text-black transition-all duration-300 block hover:pr-4 relative text-base;
}

.link-item::before {
  content: '';
  @apply absolute right-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-indigo-600 transition-all duration-300;
}

.link-item:hover::before {
  @apply w-3;
}

.social-icon-btn {
  @apply w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl;
}

.branch-card {
  @apply p-8 bg-white/70 backdrop-blur-md border border-gray-100 rounded-[2.5rem] transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 flex flex-col items-center lg:items-start text-center lg:text-right w-full;
}

.whatsapp-number-box {
  @apply px-6 py-3 rounded-2xl border-2 font-black text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:text-white shadow-sm w-full;
}

/* 2. تحريك الفقاعات الخلفية */
.animated-blob {
  position: absolute;
  top: 10%;
  right: -5%;
  z-index: 0;
  animation: blob-float 20s infinite alternate ease-in-out;
}

.animated-blob-slow {
  position: absolute;
  bottom: -10%;
  left: 5%;
  z-index: 0;
  animation: blob-float 30s infinite alternate-reverse ease-in-out;
}

@keyframes blob-float {
  0% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(-50px, 30px) scale(1.05);
  }

  66% {
    transform: translate(30px, 50px) scale(0.95);
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* 3. تحريك الأسهم الزرقاء (حركة دائرية سلسة مستمرة) */
.smooth-floating {
  position: absolute;
  pointer-events: none;
  z-index: 1;
}

/* مواقع الأسهم */
.arrow-1 {
  top: 15%;
  left: 10%;
  animation: orbit 10s infinite linear;
}

.arrow-2 {
  bottom: 30%;
  right: 15%;
  animation: orbit 14s infinite linear reverse;
}

.arrow-3 {
  top: 50%;
  left: 40%;
  animation: orbit 12s infinite linear;
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(15px) rotate(0deg);
  }

  to {
    transform: rotate(360deg) translateX(15px) rotate(-360deg);
  }
}

/* إضافة لمسة تلاشي خفيفة لجعل الحركة أكثر واقعية */
.smooth-floating svg {
  animation: pulse-opacity 4s infinite ease-in-out;
}

@keyframes pulse-opacity {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.7;
  }
}
</style>