<template>
  <div class="task-details-container" v-if="task">
    <h2 class="task-title">{{ task.Title }}</h2>
    <p class="task-status">Status: <strong>{{ task.Task }}</strong></p>
    <p v-if="task.DueDate" class="task-due-date">Due Date: <strong>{{ task.DueDate }}</strong></p>

    <div class="task-actions">
      <button class="mark-done-button" @click="updateStatus('done')">Mark as Done</button>
      <button class="delete-button" @click="removeTask">Delete Task</button>
    </div>
  </div>
  <div v-else class="loading-message">
    Loading task details...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { definePageMeta, useRoute } from '#app';
import { useRouter } from 'vue-router';
import { useStrapiFetch } from '~/composables/useStrapiFetch';

interface TaskEntity {
  id: number;
  Title: string;
  Task: string;
  DueDate?: string;
  createdAt?: string;
}

interface TaskSingleResponse {
  data: TaskEntity;
}

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const router = useRouter();

const taskId = Number(route.params.id);
const task = ref<TaskEntity | null>(null);

onMounted(() => {
  loadTask();
});

async function loadTask() {
  try {
    const response = await useStrapiFetch<TaskSingleResponse>(`/api/tasks/${taskId}`);
    task.value = response.data || null;
  } catch (err) {
    console.error('Error while loading details:', err);
  }
}

async function updateStatus(newStatus: string) {
  try {
    await useStrapiFetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: {
        data: {
          Task: newStatus,
        },
      },
    });
    loadTask();
  } catch (err) {
    console.error('Failed to change status:', err);
  }
}

async function removeTask() {
  try {
    await useStrapiFetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    router.push('/tasks');
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
}
</script>

<style scoped>
.task-details-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.task-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

.task-status,
.task-due-date {
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-align: center;
}

.task-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.mark-done-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mark-done-button:hover {
  background-color: #45a049;
}

.delete-button {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}
</style>
