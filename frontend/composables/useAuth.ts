import type { Ref } from 'vue'

interface AuthResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    // atd. dle Strapi
  }
}

export function useAuth() {
  const token = useState<string | null>('auth_token', () => null)
  const config = useRuntimeConfig()

  async function login(identifier: string, password: string) {
    try {
      const { data, error } = await useFetch<AuthResponse>('/api/auth/local', {
        baseURL: config.public.strapiUrl,
        method: 'POST',
        body: {
          identifier,
          password
        }
      })
      if (error.value) {
        throw new Error(error.value.message)
      }
      token.value = data.value?.jwt || null
    } catch (err) {
      throw err
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      const { data, error } = await useFetch<AuthResponse>('/api/auth/local/register', {
        baseURL: config.public.strapiUrl,
        method: 'POST',
        body: {
          username,
          email,
          password
        }
      })
      if (error.value) {
        throw new Error(error.value.message)
      }
      token.value = data.value?.jwt || null
    } catch (err) {
      throw err
    }
  }

  function logout() {
    token.value = null
  }

  return {
    token,
    login,
    register,
    logout
  }
}
