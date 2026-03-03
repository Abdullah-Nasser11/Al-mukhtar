export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const isAdmin = useCookie('is_admin')
    
    const localAuth = localStorage.getItem('is_admin')

    if (to.path.startsWith('/admin')) {
      if (isAdmin.value !== 'true' && localAuth !== 'true') {
        return navigateTo('/login')
      }
    }
  }
})