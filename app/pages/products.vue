<template>
  <AppNavbar />
  <div class="min-h-screen bg-gray-50 pb-20" dir="rtl">
    <header class="bg-white py-12 mb-8 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl font-black text-gray-900 mb-2">تسوق منتجاتنا</h1>
        <p class="text-gray-500">اكتشف أفضل العروض والحصريات في مكان واحد</p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 space-y-16">
      <div v-if="pending" class="text-center py-20 text-indigo-600 font-bold">
        جاري تحميل المنتجات...
      </div>

      <div v-else-if="!allProducts || allProducts.length === 0" class="text-center py-20 bg-white rounded-3xl shadow-sm">
        <p class="text-gray-400 text-lg">لا توجد منتجات معروضة حالياً.</p>
        <NuxtLink v-if="isAdmin" to="/admin" class="mt-4 inline-block text-indigo-600 underline">أضف منتجك الأول من لوحة التحكم</NuxtLink>
      </div>

      <div v-else v-for="(categoryData, categoryName) in paginatedGroupedProducts" :key="categoryName" class="space-y-6">
        <div class="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 class="text-2xl font-black text-gray-800 flex items-center gap-3">
            <span class="w-2 h-8 bg-indigo-600 rounded-full"></span>
            {{ categoryName }}
          </h2>
          <span class="text-sm text-gray-400">{{ categoryData.total }} منتج</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <ProductCard 
            v-for="product in categoryData.items" 
            :key="product.id"
            v-bind="product" 
          />
        </div>

        <div v-if="categoryData.totalPages > 1" class="flex justify-center items-center gap-2 pt-8" dir="rtl">
          <button 
            @click="changePage(categoryName, categoryPages[categoryName] - 1)"
            :disabled="categoryPages[categoryName] === 1"
            class="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-indigo-600 hover:text-white disabled:opacity-20 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="flex gap-1.5">
            <button 
              v-for="page in categoryData.totalPages" 
              :key="page"
              @click="changePage(categoryName, page)"
              :class="[
                'w-10 h-10 rounded-xl font-bold transition-all text-sm',
                categoryPages[categoryName] === page 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-indigo-300'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="changePage(categoryName, categoryPages[categoryName] + 1)"
            :disabled="categoryPages[categoryName] === categoryData.totalPages"
            class="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-indigo-600 hover:text-white disabled:opacity-20 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const isAdmin = useCookie('is_admin')
const { data: allProducts, pending } = await useFetch('/api/products')

// إعدادات الترقيم
const itemsPerPage = 8
const categoryPages = reactive({}) // كائن لتخزين الصفحة الحالية لكل فئة بشكل ديناميكي

// منطق تجميع وتقطيع المنتجات
const paginatedGroupedProducts = computed(() => {
  if (!allProducts.value) return {}

  const groups = allProducts.value.reduce((acc, product) => {
    const category = product.category || 'عام'
    if (!acc[category]) acc[category] = []
    acc[category].push(product)
    return acc
  }, {})

  const result = {}

  for (const category in groups) {
    // إذا لم تكن الفئة موجودة في تعقب الصفحات، ابدأها بصفحة 1
    if (!categoryPages[category]) {
      categoryPages[category] = 1
    }

    const totalItems = groups[category].length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const currentPage = categoryPages[category]

    // تحديد بداية ونهاية المصفوفة للصفحة الحالية
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    result[category] = {
      items: groups[category].slice(start, end),
      total: totalItems,
      totalPages: totalPages
    }
  }

  return result
})

// دالة تغيير الصفحة مع تأثير التمرير للقسم
const changePage = (categoryName, newPage) => {
  categoryPages[categoryName] = newPage
  // اختياري: العودة للأعلى قليلاً عند تغيير الصفحة في قسم معين
  // window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>