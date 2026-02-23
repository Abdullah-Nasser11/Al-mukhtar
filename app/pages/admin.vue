<template>
  <div class="min-h-screen bg-gray-50 flex" dir="rtl">
    <aside class="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 shadow-xl">
      <div class="mb-10 text-center">
        <h2 class="text-2xl font-black tracking-widest text-indigo-400">لوحة الإدارة</h2>
        <p class="text-xs text-slate-400 mt-1">إدارة المنتجات والمخزون</p>
      </div>
      <nav class="space-y-4">
        <NuxtLink to="/" class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          <span>🏠</span> الرئيسية
        </NuxtLink>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-indigo-600 font-bold cursor-default">
          <span>📦</span> المنتجات
        </div>
      </nav>
    </aside>

    <main class="flex-1 p-4 md:p-8 overflow-y-auto">
      <header class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-800">إدارة المنتجات</h1>
          <p class="text-slate-500">لديك حالياً {{ filteredProducts.length }} منتجات.</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div class="bg-indigo-50 p-3 rounded-xl text-indigo-600 text-xl">🛒</div>
            <div>
              <p class="text-xs text-slate-400">الإجمالي</p>
              <p class="text-xl font-bold">{{ products.length }}</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div class="bg-green-50 p-3 rounded-xl text-green-600 text-xl">💰</div>
            <div>
              <p class="text-xs text-slate-400">الفئات</p>
              <p class="text-xl font-bold">{{ categoriesCount }}</p>
            </div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section class="lg:col-span-4">
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-10">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <span class="w-2 h-6 bg-indigo-600 rounded-full"></span>
              {{ editId ? 'تعديل البيانات' : 'إضافة منتج جديد' }}
            </h2>

            <form @submit.prevent="saveProduct" class="space-y-4 text-right">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">اسم المنتج</label>
                <input v-model="form.title" type="text" required class="admin-input" />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">وصف المنتج</label>
                <textarea v-model="form.description" rows="3" class="admin-input"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">الفئة</label>
                <div class="flex gap-2">
                  <select v-model="form.category" required class="admin-input flex-1">
                    <option v-for="cat in existingCategories" :key="cat" :value="cat">{{ cat }}</option>
                    <option value="NEW_CATEGORY">+ فئة جديدة</option>
                  </select>
                  <button v-if="form.category !== 'عام' && form.category !== 'NEW_CATEGORY'" 
                    type="button" @click="deleteCategoryGlobally(form.category)"
                    class="bg-red-50 text-red-500 px-3 rounded-xl hover:bg-red-100 border border-red-100 transition">
                    🗑️
                  </button>
                </div>
                
                <div v-if="form.category === 'NEW_CATEGORY'" class="flex gap-2 mt-2 p-2 bg-indigo-50 rounded-xl border border-indigo-100">
                  <input v-model="newCategoryName" type="text" class="admin-input border-indigo-200 flex-1 !bg-white" placeholder="اسم الفئة الجديدة" @keyup.enter="handleNewCategory" />
                  <button @click="handleNewCategory" type="button" class="bg-indigo-600 text-white px-3 rounded-lg hover:bg-indigo-700">✅</button>
                  <button @click="clearNewCategory" type="button" class="bg-white text-red-500 px-3 rounded-lg border border-red-100">✕</button>
                </div>
              </div>

              <div class="space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1">السعر الأصلي</label>
                  <input v-model.number="form.originalPrice" type="number" step="0.01" required class="admin-input" @input="updateByPrice" />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-indigo-600 mb-1">نسبة الخصم (%)</label>
                    <input v-model.number="discountPercent" type="number" class="admin-input border-indigo-200" placeholder="0" @input="updateByPercent" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-green-600 mb-1">بعد الخصم</label>
                    <input v-model.number="form.discountPrice" type="number" step="0.01" required class="admin-input border-green-200" @input="updateByPrice" />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">صورة المنتج</label>
                <div class="relative group">
                  <input type="file" @change="handleImageUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div class="admin-input flex items-center justify-between bg-white group-hover:bg-slate-50 transition-colors">
                    <span class="text-slate-500 text-xs truncate max-w-[180px]">
                      {{ form.image ? '✅ تم اختيار صورة' : 'رفع صورة من الجهاز' }}
                    </span>
                    <span class="text-indigo-600 font-bold text-xs underline">تصفح</span>
                  </div>
                </div>
              </div>

              <div class="pt-4 flex gap-2">
                <button type="submit" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all active:scale-95">
                  {{ editId ? 'تحديث الآن' : 'حفظ المنتج' }}
                </button>
                <button v-if="editId" @click="resetForm" type="button" class="bg-slate-100 text-slate-500 px-4 rounded-xl hover:bg-slate-200">إلغاء</button>
              </div>
            </form>
          </div>
        </section>

        <section class="lg:col-span-8">
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 class="font-bold text-slate-800 text-lg">قائمة المخزون</h3>
              <input v-model="searchQuery" type="text" placeholder="بحث..." class="bg-slate-50 border border-slate-100 rounded-lg text-sm p-2 w-64 outline-none" />
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-right text-sm">
                <thead>
                  <tr class="bg-slate-50/50 text-slate-400">
                    <th class="p-4">المنتج</th>
                    <th class="p-4 text-center">السعر</th>
                    <th class="p-4 text-center">العمليات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="product in filteredProducts" :key="product.id" class="group hover:bg-slate-50">
                    <td class="p-4 flex items-center gap-3">
                      <div class="w-10 h-10 rounded bg-slate-100 overflow-hidden border">
                        <img v-if="product.image" :src="product.image" class="w-full h-full object-cover" />
                      </div>
                      <div>
                         <span class="font-bold text-slate-700 block">{{ product.title }}</span>
                         <span class="text-[10px] text-slate-400 italic">{{ product.category }}</span>
                      </div>
                    </td>
                    <td class="p-4 text-center">
                      <div class="flex flex-col items-center">
                        <span class="text-indigo-600 font-bold">{{ product.discountPrice }} ر.س</span>
                        <span v-if="product.originalPrice > product.discountPrice" class="text-[10px] text-red-400 line-through">{{ product.originalPrice }} ر.س</span>
                      </div>
                    </td>
                    <td class="p-4 text-center">
                      <div class="flex justify-center gap-2">
                        <button @click="startEdit(product)" class="p-1 text-indigo-600 hover:scale-125 transition">📝</button>
                        <button @click="deleteProduct(product.id)" class="p-1 text-red-500 hover:scale-125 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredProducts.length === 0">
                    <td colspan="3" class="p-10 text-center text-slate-400">لا توجد منتجات مطابقة للبحث</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' })

const products = ref([])
const editId = ref(null)
const searchQuery = ref('')
const newCategoryName = ref('')
const temporaryCategories = ref([])
const discountPercent = ref(0)

const form = ref({
  title: '',
  description: '',
  category: 'عام',
  discountPrice: 0,
  originalPrice: 0,
  image: '',
  tag: ''
})

// --- منطق الأسعار والنسبة ---

const updateByPercent = () => {
  if (form.value.originalPrice > 0) {
    const discountAmount = (form.value.originalPrice * discountPercent.value) / 100
    form.value.discountPrice = Number((form.value.originalPrice - discountAmount).toFixed(2))
  }
}

const updateByPrice = () => {
  if (form.value.originalPrice > 0 && form.value.discountPrice >= 0) {
    const diff = form.value.originalPrice - form.value.discountPrice
    discountPercent.value = Math.round((diff / form.value.originalPrice) * 100)
  }
}

// --- العمليات ---

onMounted(() => {
  refresh()
})

const refresh = () => {
  if (process.client) {
    const data = localStorage.getItem('products')
    products.value = data ? JSON.parse(data) : []
  }
}

const existingCategories = computed(() => {
  if (!Array.isArray(products.value)) return ['عام']
  const savedCats = products.value.map(p => p.category)
  const allCats = [...savedCats, ...temporaryCategories.value].filter(c => c && c !== 'NEW_CATEGORY')
  return [...new Set(['عام', ...allCats])]
})

const categoriesCount = computed(() => existingCategories.value.length)

const filteredProducts = computed(() => {
  if (!Array.isArray(products.value)) return []
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p =>
    (p.title?.toLowerCase().includes(query)) ||
    (p.category?.toLowerCase().includes(query))
  )
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => form.value.image = e.target.result
  reader.readAsDataURL(file)
}

const saveProduct = () => {
  const list = JSON.parse(localStorage.getItem('products') || '[]')

  if (editId.value) {
    const index = list.findIndex(p => p.id === editId.value)
    if (index !== -1) list[index] = { ...form.value, id: editId.value }
  } else {
    list.push({ ...form.value, id: Date.now() })
  }

  localStorage.setItem('products', JSON.stringify(list))
  resetForm()
  refresh()
  alert('✅ تم الحفظ بنجاح')
}

const deleteProduct = (id) => {
  if (!confirm('هل أنت متأكد؟')) return
  const list = JSON.parse(localStorage.getItem('products') || '[]')
  localStorage.setItem('products', JSON.stringify(list.filter(p => p.id !== id)))
  refresh()
}

const startEdit = (p) => {
  editId.value = p.id
  form.value = { ...p }
  updateByPrice() 
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNewCategory = () => {
  const name = newCategoryName.value.trim()
  if (!name) return
  if (!temporaryCategories.value.includes(name)) temporaryCategories.value.push(name)
  form.value.category = name
  newCategoryName.value = ''
}

const clearNewCategory = () => {
  newCategoryName.value = ''
  form.value.category = 'عام'
}

const deleteCategoryGlobally = (categoryName) => {
  if (!confirm(`سيتم نقل جميع منتجات "${categoryName}" إلى فئة "عام". هل أنت متأكد؟`)) return
  const list = JSON.parse(localStorage.getItem('products') || '[]')
  const updated = list.map(p => p.category === categoryName ? { ...p, category: 'عام' } : p)
  localStorage.setItem('products', JSON.stringify(updated))
  temporaryCategories.value = temporaryCategories.value.filter(c => c !== categoryName)
  refresh()
}

const resetForm = () => {
  editId.value = null
  newCategoryName.value = ''
  discountPercent.value = 0
  form.value = { title: '', description: '', category: 'عام', discountPrice: 0, originalPrice: 0, image: '', tag: '' }
}
</script>

<style scoped>
.admin-input {
  @apply w-full bg-slate-50 border-slate-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all border block text-right;
}
</style>