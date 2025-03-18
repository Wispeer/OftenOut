<template>
    <div>
      <h1>Tasks</h1>
      <div v-if="loading">Načítám...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <li
          v-for="task in tasks"
          :key="task.id"
          @click="goToDetail(task.id)"
        >
          {{ task.attributes.title }} - {{ task.attributes.status }}
        </li>
      </ul>
  
      <button @click="createTask">+ Přidat nový úkol</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRuntimeConfig } from '#app'
  import { useAuth } from '~/composables/useAuth'
  
  interface TaskAttributes {
    title: string
    description?: string
    status: 'pending' | 'in progress' | 'done'
    dueDate?: string
  }
  
  interface TaskData {
    id: number
    attributes: TaskAttributes
  }
  
  const tasks = ref<TaskData[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const config = useRuntimeConfig()
  const { token } = useAuth()
  
  onMounted(fetchTasks)
  
  async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await useFetch<{ data: TaskData[] }>('/api/tasks', {
        baseURL: config.public.strapiUrl,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      if (fetchError.value) {
        throw new Error(fetchError.value.message)
      }
      tasks.value = data.value?.data || []
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  function goToDetail(id: number) {
    navigateTo(`/tasks/${id}`)
  }
  
  async function createTask() {
    try {
      await useFetch('/api/tasks', {
        baseURL: config.public.strapiUrl,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: {
          data: {
            title: 'Nový úkol',
            status: 'pending'
          }
        }
      })
      // Po vytvoření znovu načti seznam
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }
  </script>
  