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
        <div class="flex items-center gap-3 p-3 rounded-lg bg-indigo-600 font-bold">
          <span>📦</span> المنتجات
        </div>
      </nav>
    </aside>

    <main class="flex-1 p-4 md:p-8 overflow-y-auto">
      <header class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-800">إدارة المنتجات</h1>
          <p class="text-slate-500">لديك حالياً {{ filteredProducts.length }} منتجات معروضة.</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div class="bg-indigo-50 p-3 rounded-xl text-indigo-600 text-xl">🛒</div>
            <div>
              <p class="text-xs text-slate-400">الإجمالي</p>
              <p class="text-xl font-bold">{{ products?.length || 0 }}</p>
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
                <input v-model="form.title" type="text" required class="admin-input" placeholder="" />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">وصف المنتج</label>
                <textarea v-model="form.description" rows="3" class="admin-input" placeholder="اكتب تفاصيل المنتج هنا..."></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">الفئة</label>
                  <select v-model="form.category" required class="admin-input">
                    <option value="" disabled>اختر الفئة</option>
                    <option v-for="cat in existingCategories" :key="cat" :value="cat">{{ cat }}</option>
                    <option value="NEW_CATEGORY">+ فئة جديدة</option>
                  </select>
                  <input v-if="form.category === 'NEW_CATEGORY'" v-model="newCategoryName" type="text" 
                    class="admin-input mt-2 border-indigo-300" placeholder="اسم الفئة الجديدة" @blur="handleNewCategory" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">الخصم</label>
                  <input v-model="form.tag" type="text" class="admin-input" placeholder="خصم 20%" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">السعر الأصلي</label>
                  <input v-model.number="form.originalPrice" type="number" step="0.01" required class="admin-input" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-600 mb-1">بعد الخصم</label>
                  <input v-model.number="form.discountPrice" type="number" step="0.01" required class="admin-input" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1">صورة المنتج</label>
                <div class="relative group">
                  <input type="file" @change="handleImageUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div class="admin-input flex items-center justify-between bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <span class="text-slate-500 text-xs truncate max-w-[180px]">
                      {{ form.image ? '✅ تم اختيار صورة' : 'رفع صورة من الجهاز' }}
                    </span>
                    <span class="text-indigo-600 font-bold text-xs underline">تصفح</span>
                  </div>
                </div>
                <div v-if="form.image" class="mt-2 text-center">
                  <img :src="form.image" class="h-20 mx-auto rounded-lg border shadow-sm" />
                </div>
              </div>

              <div class="pt-4 flex gap-2">
                <button type="submit" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  {{ editId ? 'تحديث الآن' : 'حفظ المنتج' }}
                </button>
                <button v-if="editId" @click="resetForm" type="button" class="bg-slate-100 text-slate-500 px-4 rounded-xl hover:bg-slate-200">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </section>

        <section class="lg:col-span-8">
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 class="font-bold text-slate-800 text-lg">قائمة المخزون</h3>
              <input v-model="searchQuery" type="text" placeholder="بحث باسم المنتج أو الفئة..." class="bg-slate-50 border border-slate-100 rounded-lg text-sm p-2 w-64 focus:ring-1 focus:ring-indigo-500 outline-none" />
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-right">
                <thead>
                  <tr class="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th class="p-4">المنتج</th>
                    <th class="p-4">الفئة</th>
                    <th class="p-4">السعر</th>
                    <th class="p-4 text-center">العمليات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="product in filteredProducts" :key="product.id" class="group hover:bg-slate-50/80 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="w-14 h-14 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                          <img v-if="product.image" :src="product.image" :alt="product.title" class="w-full h-full object-cover" @error="(e) => e.target.src = 'https://placehold.co/100x100?text=No+Image'" />
                          <span v-else class="text-slate-300 text-xs">لا صورة</span>
                        </div>
                        <div>
                          <span class="font-bold text-slate-700 block line-clamp-1 text-sm">{{ product.title }}</span>
                          <span class="text-[10px] text-slate-400 line-clamp-1 max-w-[150px]">{{ product.description }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-4 text-slate-500">
                      <span class="bg-slate-100 px-2 py-1 rounded-md text-[10px] font-medium">{{ product.category }}</span>
                    </td>
                    <td class="p-4">
                      <div class="flex flex-col">
                        <span class="font-black text-slate-800 text-sm">{{ product.discountPrice }}$</span>
                        <span class="text-[10px] text-slate-400 line-through">{{ product.originalPrice }}$</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex justify-center gap-2">
                        <button @click="startEdit(product)" class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="تعديل">📝</button>
                        <button @click="deleteProduct(product.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف">🗑️</button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!filteredProducts.length">
                    <td colspan="4" class="p-10 text-center text-slate-400">لا توجد نتائج تطابق بحثك أو القائمة فارغة.</td>
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

const { data: products, refresh } = await useFetch('/api/products')
const editId = ref(null)
const searchQuery = ref('')
const newCategoryName = ref('')

const form = ref({
  title: '',
  description: '',
  category: '',
  discountPrice: 0,
  originalPrice: 0,
  image: '',
  tag: ''
})

// استخراج الفئات الفريدة الموجودة مسبقاً
const existingCategories = computed(() => {
  if (!products.value) return ['عام']
  const cats = products.value.map(p => p.category)
  return [...new Set(['عام', ...cats])]
})

const categoriesCount = computed(() => existingCategories.value.length)

const filteredProducts = computed(() => {
  if (!products.value) return []
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  )
})

// معالجة إضافة فئة جديدة من القائمة
const handleNewCategory = () => {
  if (newCategoryName.value.trim()) {
    form.value.category = newCategoryName.value.trim()
    newCategoryName.value = ''
  }
}

// معالجة رفع الصورة وتحويلها لـ Base64
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.image = e.target.result
  }
  reader.readAsDataURL(file)

  const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // تصغير العرض لـ 800 بكسل كحد أقصى
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // تحويل الصورة لجودة 0.7 (توفر مساحة ضخمة وبجودة ممتازة)
      form.value.image = canvas.toDataURL('image/jpeg', 0.7);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
}

const saveProduct = async () => {
  try {
    const method = editId.value ? 'PUT' : 'POST'
    await $fetch('/api/products', {
      method,
      body: editId.value ? { ...form.value, id: editId.value } : form.value
    })
    resetForm()
    await refresh()
    alert('✅ تم الحفظ بنجاح')
  } catch (e) {
    alert('❌ خطأ في الحفظ')
  }
}

const deleteProduct = async (id) => {
  if (confirm('هل أنت متأكد من الحذف؟')) {
    await $fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    await refresh()
  }
}

const startEdit = (p) => {
  editId.value = p.id
  form.value = { ...p }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetForm = () => {
  editId.value = null
  form.value = { title: '', description: '', category: '', discountPrice: 0, originalPrice: 0, image: '', tag: '' }
}
</script>

<style scoped>
.admin-input {
  @apply w-full bg-slate-50 border-slate-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all border block;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>