export default defineNuxtRouteMiddleware((to) => {
  const isAdmin = useCookie('is_admin') 
  
  // إذا كان المستخدم غير مسجل دخول ويحاول دخول صفحة الإدارة
  if (to.path.startsWith('/admin') && isAdmin.value !== 'true') {
    return navigateTo('/login') 
  }
})