<template>
  <div class="w-full py-3">
    <div class="swiper mySwiper rounded-[2.5rem] overflow-hidden shadow-2xl group">
      <div class="swiper-wrapper">
        <div v-for="(video, index) in videoSlides" :key="index" class="swiper-slide relative">
          
          <video 
            :src="video.url" 
            class="w-full h-[400px] md:h-[750px] object-cover"
            autoplay 
            muted 
            loop 
            playsinline
          ></video>

          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-20 text-white" dir="rtl">
            <div class="max-w-3xl space-y-4 transform transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-right">
              <span class="inline-block px-4 py-1 bg-indigo-600 text-xs font-bold uppercase tracking-widest rounded-full">حصرياً في المختار</span>
              <h3 class="text-3xl md:text-6xl font-black leading-tight">{{ video.title }}</h3>
              <p class="text-gray-300 text-lg md:text-xl font-medium max-w-xl">{{ video.description }}</p>
              
            </div>
          </div>
        </div>
      </div>
      
      <div class="swiper-button-next !w-14 !h-14 !bg-white/10 hover:!bg-indigo-600 !backdrop-blur-md !rounded-full !text-white after:!text-xl transition-all"></div>
      <div class="swiper-button-prev !w-14 !h-14 !bg-white/10 hover:!bg-indigo-600 !backdrop-blur-md !rounded-full !text-white after:!text-xl transition-all"></div>
      
      <div class="swiper-pagination !bottom-8"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// بيانات الفيديوهات
const videoSlides = [
  {
    url: 'slide.mp4',
    title: 'نبض محركك بين أيدٍ أمينة',
    description:" تقنيات تشحيم متطورة تضمن أقصى حماية لمحركك تحت أصعب الظروف المناخية، لتدوم رحلتك طويلاً"
  },
]

onMounted(() => {
  new Swiper('.mySwiper', {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    effect: 'fade', // تأثير التلاشي يعطي شعوراً أفخم مع الفيديو
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + ' !w-12 !h-1 !rounded-none !bg-white/30"></span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
</script>

<style scoped>
/* تخصيص نقاط التنقل لتصبح خطوطاً عصرية */
:deep(.swiper-pagination-bullet-active) {
  background-color: #4f46e5 !important; /* Indigo-600 */
  width: 48px !important;
}

/* إخفاء الأسهم وإظهارها عند التحويم */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover :deep(.swiper-button-next),
.group:hover :deep(.swiper-button-prev) {
  opacity: 1;
  transform: scale(1);
}

/* جعل السلايدر يفتح بارتفاع كامل في الشاشات الكبيرة */
@media (min-width: 1024px) {
  .swiper-slide video {
    filter: brightness(0.8); /* تعتيم خفيف ليبرز النص */
  }
}
</style>