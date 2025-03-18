// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    // Seznam cest, které jsou přístupné bez přihlášení
    const publicPaths = ['/login', '/register']
  
    const { token } = useAuth()
  
    if (!token.value && !publicPaths.includes(to.path)) {
      return navigateTo('/login')
    }
  })
  