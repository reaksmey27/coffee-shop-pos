<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-6">
      Dashboard Overview
    </h1>

    <div class="grid grid-cols-4 gap-4">

      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Total Orders</p>
        <p class="text-2xl font-bold">{{ stats.totalOrders }}</p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Total Sales</p>
        <p class="text-2xl font-bold">
          ${{ stats.totalSales }}
        </p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Pending</p>
        <p class="text-2xl font-bold text-yellow-500">
          {{ stats.pending }}
        </p>
      </div>

      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Completed</p>
        <p class="text-2xl font-bold text-green-500">
          {{ stats.completed }}
        </p>
      </div>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const stats = ref({
  totalOrders: 0,
  totalSales: 0,
  pending: 0,
  completed: 0,
});

onMounted(async () => {
  const res = await api.get("/dashboard/stats");
  stats.value = res.data;
});
</script>