export default defineNuxtRouteMiddleware((to) => {
  // نستخدم الكود الذي نجح معك في الكونسول
  if (import.meta.client) {
    const isAdmin = useCookie('is_admin')
    
    // إذا كنت تحاول دخول صفحة الأدمن والكوكي غير موجود أو ليس true
    if (to.path.startsWith('/admin') && isAdmin.value !== 'true') {
      return navigateTo('/login')
    }
  }
})