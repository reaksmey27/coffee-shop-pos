<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";

const message = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/test");
    message.value = res.data.message;
  } catch (err) {
    message.value = "Backend not connected";
  }
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <p class="mt-4 text-green-600">
      {{ message }}
    </p>
  </div>
</template>