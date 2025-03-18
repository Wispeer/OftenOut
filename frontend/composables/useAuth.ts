import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

interface AuthUser {
  id: number
  username: string
  email: string
}

interface AuthResponse {
  jwt: string
  user: AuthUser
}

const user = ref<AuthUser | null>(null)

export function useAuth() {
  const config = useRuntimeConfig()

  async function login(email: string, password: string) {
    try {
      console.log('Sending login request...')

      const res = await $fetch<AuthResponse>(`${config.public.strapiUrl}/api/auth/local`, {
        method: 'POST',
        body: {
          identifier: email,
          password
        }
      })

      if (!res.jwt) {
        throw new Error('Login failed: No token was returned.')
      }

      console.log('Login successful, saving token...')
      localStorage.setItem('token', res.jwt)
      user.value = res.user
    } catch (err) {
      console.error('Error during login:', err)
      throw new Error('Login failed: ' + (err as Error).message)
    }
  }

  function logout() {
    console.log('Logging out...')
    localStorage.removeItem('token')
    user.value = null
  }

  return {
    user,
    login,
    logout
  }
}
