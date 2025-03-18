<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" />
        </div>
        <button>Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuth } from '~/composables/useAuth'
  import { useRouter } from 'vue-router' // v Nuxtu nepotřebujete přímo vue-router importovat, lze použít navigateTo()
  
  const router = useRouter()
  
  const email = ref('')
  const password = ref('')
  const error = ref<string| null>(null)
  
  const { login, token } = useAuth()
  
  async function handleLogin() {
    try {
      await login(email.value, password.value)
      // Po přihlášení redirect
      navigateTo('/tasks')
    } catch (err: any) {
      error.value = err.message
    }
  }
  </script>
  