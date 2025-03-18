import { ref } from "vue";
import { useStrapiFetch } from "@/composables/useStrapiFetch";

export interface TaskEntity {
  id: number;
  documentId: string;
  Title: string;
  Description?: object[];
  DueDate?: string;
  Task?: string;
  createdAt?: string;
}

const tasks = ref<TaskEntity[]>([]);

async function loadTasks() {
  try {
    const response = await useStrapiFetch<{ data: TaskEntity[] }>("/api/tasks");

    console.log("API response:", response);
    tasks.value =
      response?.data
        .map((task) => ({
          ...task,
          DescriptionText: task.Description
            ? task.Description.map((desc) =>
                desc.children.map((child) => child.text).join(" ")
              ).join("\n")
            : "",
        }))
        .sort((a, b) => a.id - b.id) ?? [];
  } catch (err) {
    console.error("Error while loading tasks:", err);
    tasks.value = [];
  }
}

async function createTask() {
  try {
    const response = await useStrapiFetch("/api/tasks", {
      method: "POST",
      body: {
        data: {
          Title: "New task",
          Task: "pending",
          DueDate: "2025-04-01",
        },
      },
    });

    console.log("Task created:", response);
    await loadTasks();
  } catch (err) {
    console.error("Error while creating task:", err);
  }
}

async function updateTask(task: TaskEntity) {
  try {
    console.log(`🔄 Attempting to update task ${task.documentId}...`);

    await useStrapiFetch(`/api/tasks/${task.documentId}`, {
      method: "PUT",
      body: {
        data: {
          Title: task.Title,
          Task: task.Task,
          DueDate: task.DueDate,
        },
      },
    });

    console.log(`✅ Task ${task.documentId} successfully updated!`);
    await loadTasks();
  } catch (err: any) {
    if (err.status === 404) {
      console.warn(
        `⚠️ Task ${task.documentId} does not exist, reloading the list...`
      );
      await loadTasks();
    } else {
      console.error(`Error while updating task ${task.documentId}:`, err);
    }
  }
}

async function deleteTask(documentId: string) {
  try {
    console.log(`🗑️ Attempting to delete task ${documentId}...`);

    await useStrapiFetch(`/api/tasks/${documentId}`, {
      method: "DELETE",
    });

    console.log(`✅ Task ${documentId} successfully deleted!`);
    await loadTasks();
  } catch (err: any) {
    if (err.status === 404) {
      console.warn(
        `⚠️ Task ${documentId} no longer exists, reloading the list...`
      );
      await loadTasks();
    } else {
      console.error(`Error while deleting task ${documentId}:`, err);
    }
  }
}

export function useTasks() {
  return {
    tasks,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
