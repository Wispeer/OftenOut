<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

if (process.client) {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  } else {
    router.push("/tasks");
  }
}
</script>
