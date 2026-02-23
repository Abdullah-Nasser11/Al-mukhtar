export default defineNuxtRouteMiddleware((to) => {
  // نستخدم useCookie مع اسم موحد
  const isAdmin = useCookie('is_admin')
  
  if (to.path.startsWith('/admin')) {
    // نتحقق من القيمة. إذا كانت فارغة، نمنع الدخول
    if (isAdmin.value !== 'true') {
      console.log("الوصول مرفوض: الكوكي غير موجود أو قيمته ليست true")
      return navigateTo('/login')
    }
  }
})