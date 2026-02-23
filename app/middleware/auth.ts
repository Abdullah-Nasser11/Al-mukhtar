// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  // نستخدم نفس الاسم 'is_admin' الذي وضعناه في صفحة الـ login
  const isAdmin = useCookie('is_admin') 
  
  // إذا كان المستخدم يحاول دخول أي صفحة تبدأ بـ /admin 
  // وهو ليس لديه صلاحية (الكوكيز فارغ)
  if (to.path.startsWith('/admin') && !isAdmin.value) {
    // نرسله لصفحة تسجيل الدخول بدلاً من الرئيسية (لأنه قد يكون الأدمن ونسي تسجيل دخوله)
    return navigateTo('/login') 
  }
})