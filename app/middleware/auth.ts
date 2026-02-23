export default defineNuxtRouteMiddleware((to) => {
  // استخدام طريقتك الذكية لضمان العمل في المتصفح
  if (import.meta.client) {
    const isAdmin = useCookie('is_admin')
    
    if (to.path.startsWith('/admin')) {
      // طباعة القيمة في Console المتصفح للتأكد (يمكنك حذفها لاحقاً)
      console.log("قيمة الكوكي الحالية هي:", isAdmin.value)

      if (isAdmin.value !== 'true') {
        return navigateTo('/login')
      }
    }
  }
})