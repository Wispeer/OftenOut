<template>
    <div>
      <h2 v-if="task">
        {{ task.attributes.title }}
      </h2>
      <p v-if="task">
        Status: {{ task.attributes.status }}
      </p>
      <p v-else>Načítám detail...</p>
  
      <button @click="updateStatus('done')">Označit jako hotovo</button>
      <button @click="removeTask">Smazat</button>
  
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from '#app'
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
  
  const route = useRoute()
  const config = useRuntimeConfig()
  const { token } = useAuth()
  
  const task = ref<TaskData | null>(null)
  const error = ref<string | null>(null)
  
  onMounted(fetchTask)
  
  async function fetchTask() {
    const id = route.params.id
    try {
      const { data, error: fetchError } = await useFetch<{ data: TaskData }>(
        `/api/tasks/${id}`,
        {
          baseURL: config.public.strapiUrl,
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      if (fetchError.value) {
        throw new Error(fetchError.value.message)
      }
      task.value = data.value?.data || null
    } catch (err: any) {
      error.value = err.message
    }
  }
  
  async function updateStatus(newStatus: string) {
    if (!task.value) return
    try {
      await useFetch(`/api/tasks/${task.value.id}`, {
        baseURL: config.public.strapiUrl,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: {
          data: {
            status: newStatus
          }
        }
      })
      fetchTask()
    } catch (err) {
      console.error(err)
    }
  }
  
  async function removeTask() {
    if (!task.value) return
    try {
      await useFetch(`/api/tasks/${task.value.id}`, {
        baseURL: config.public.strapiUrl,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      navigateTo('/tasks')
    } catch (err) {
      console.error(err)
    }
  }
  </script>
  