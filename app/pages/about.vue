<template>
    <AppNavbar />
  <div class="about-page bg-white overflow-hidden font-sans text-slate-900" dir="rtl">
    
    <section class="relative pt-32 pb-20 px-6 lg:px-8 flex flex-col items-center text-center">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <span class="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-widest uppercase mb-6 animate-fade-in">
        حكاية المختار
      </span>
      <h1 class="text-5xl lg:text-7xl font-black leading-tight mb-8 text-slate-900 tracking-tight">
        نسجنا الفخامة <br/> 
        <span class="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-emerald-500">لتناسب ذوقكم الرفيع</span>
      </h1>
      <p class="text-gray-500 text-xl max-w-2xl leading-relaxed font-medium">
        في متجر المختار، لا نبيع مجرد منتجات؛ نحن نقدم تجربة حياتية تجمع بين عراقة الجودة وحداثة التصميم العالمي.
      </p>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="relative group">
          <div class="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-emerald-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
          <img src="/about.jpeg" 
               alt="Luxury Store" 
               class="relative rounded-[2.5rem] shadow-2xl object-cover h-[500px] w-full transform hover:scale-[1.02] transition duration-500">
        </div>
        
        <div class="space-y-8 lg:pr-12">
          <div class="space-y-4">
            <h2 class="text-4xl font-black text-slate-900 leading-snug">رؤية تتجاوز الحدود، <br/> وجودة لا تقبل المساومة.</h2>
            <p class="text-gray-500 text-lg leading-8">
              بدأنا بفرعنا الصغير وطموحنا الكبير، واليوم نفخر بأننا الوجهة الأولى لكل من يبحث عن التميز. نحن نؤمن أن كل عميل يستحق قطعة فريدة تروي قصة نجاحه.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition duration-300">
              <span class="text-3xl mb-4 block">✨</span>
              <h4 class="font-bold text-xl mb-2">الأصالة</h4>
              <p class="text-sm text-gray-500">منتجات مختارة بعناية من أرقى الماركات.</p>
            </div>
            <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition duration-300">
              <span class="text-3xl mb-4 block">🚀</span>
              <h4 class="font-bold text-xl mb-2">السرعة</h4>
              <p class="text-sm text-gray-500">توصيل يواكب إيقاع حياتك العصري.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 class="text-4xl font-black mb-16 text-slate-900 italic">ما الذي يجعلنا مختلفين؟</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(value, index) in values" :key="index" class="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group">
          <div class="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto group-hover:bg-indigo-600 group-hover:rotate-12 transition-all duration-500">
            {{ value.icon }}
          </div>
          <h4 class="text-2xl font-black mb-4">{{ value.title }}</h4>
          <p class="text-gray-500 leading-7">{{ value.description }}</p>
        </div>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-6 py-24">
      <div class="bg-gradient-to-tr from-indigo-600 to-indigo-900 rounded-[4rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <h2 class="text-4xl lg:text-6xl font-black mb-8 relative z-10">هل أنت مستعد لتجربة <br/> تسوق فريدة؟</h2>
        <NuxtLink to="/products" class="relative z-10 inline-block bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-xl">
          اكتشف المتجر الآن
        </NuxtLink>
      </div>
    </section>
  </div>
  <AppFooter />
</template>

<script setup>
import App from '~/app.vue';


const values = [
  { icon: '💎', title: 'فخامة الاختيار', description: 'لا نرضى إلا بالأفضل، حيث تخضع كل قطعة لاختبارات جودة صارمة قبل العرض.' },
  { icon: '🤝', title: 'ثقة متبادلة', description: 'بنينا جسور الثقة مع عملائنا عبر الصدق والشفافية في كل عملية بيع.' },
  { icon: '🌍', title: 'عالمية المظهر', description: 'نجلب لك أحدث صيحات الموضة والمنتجات من عواصم الجمال العالمية.' },
];
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

h1, h2, h3, h4 {
  font-family: 'Tajawal', sans-serif;
}
</style>