export default defineNuxtRouteMiddleware((to) => {
  const isAdmin = useCookie('is_admin')
  
  // التحقق فقط إذا كنا نتجه لصفحة الأدمن
  if (to.path.startsWith('/admin')) {
     if (isAdmin.value !== 'true') {
       return navigateTo('/login')
     }
  }
})