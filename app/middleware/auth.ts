export default defineNuxtRouteMiddleware((to) => {
  const isAdmin = useCookie('is_admin')
  
  // التحقق فقط عند محاولة دخول صفحات الإدارة
  if (to.path.startsWith('/admin')) {
    // في بيئة Static/SPA، نتحقق من القيمة مباشرة
    if (isAdmin.value !== 'true') {
      return navigateTo('/login')
    }
  }
})