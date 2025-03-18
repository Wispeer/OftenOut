<template>
  <div class="task-list-container">
    <h1 class="title">Task List</h1>
    <button class="create-task-button" @click="createTask">+ Create New Task</button>

    <ul v-if="sortedTasks.length" class="task-list">
      <li v-for="task in sortedTasks" :key="task.documentId" class="task-item">
        <div class="task-header">
          <input
            class="task-title"
            type="text"
            v-model="task.Title"
            @blur="updateTask(task)"
            @keyup.enter="updateTask(task)"
            placeholder="Task Title"
          />
          <button class="delete-button" @click="deleteTask(task.documentId)">🗑️</button>
        </div>

        <textarea
          class="task-description"
          v-model="task.DescriptionText"
          @blur="updateTask(task)"
          placeholder="Task Description"
        ></textarea>

        <div class="task-footer">
          <input
            class="task-date"
            type="date"
            v-model="task.DueDate"
            @blur="updateTask(task)"
            @keyup.enter="updateTask(task)"
          />

          <select class="task-status" v-model="task.Task" @change="updateTask(task)">
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </li>
    </ul>
    <p v-else class="no-tasks-message">No tasks available</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTasks } from "@/composables/useTasks";

const router = useRouter();
const { tasks, loadTasks, createTask, updateTask, deleteTask } = useTasks();

if (process.client) {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
}

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => a.id - b.id);
});

onMounted(() => {
  loadTasks();
});
</script>

<style scoped>
.task-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.create-task-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-task-button:hover {
  background-color: #45a049;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  flex: 1;
  font-size: 1.2rem;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.delete-button {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-button:hover {
  background: #c0392b;
}

.task-description {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-date {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.task-status {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.no-tasks-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
</style>
