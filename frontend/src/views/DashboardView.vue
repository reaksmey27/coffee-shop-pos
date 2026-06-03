<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-6">
      📊 Dashboard
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div class="bg-white p-4 shadow rounded">
        <p>Total Sales</p>
        <h2 class="text-2xl font-bold">
          ${{ stats.totalSales }}
        </h2>
      </div>

      <div class="bg-white p-4 shadow rounded">
        <p>Total Orders</p>
        <h2 class="text-2xl font-bold">
          {{ stats.totalOrders }}
        </h2>
      </div>

      <div class="bg-yellow-100 p-4 shadow rounded">
        <p>Pending</p>
        <h2 class="text-2xl font-bold">
          {{ stats.pending }}
        </h2>
      </div>

      <div class="bg-green-100 p-4 shadow rounded">
        <p>Completed</p>
        <h2 class="text-2xl font-bold">
          {{ stats.completed }}
        </h2>
      </div>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const stats = ref({
  totalSales: 0,
  totalOrders: 0,
  pending: 0,
  completed: 0,
});

const loadStats = async () => {
  const res = await api.get("/reports/sales");
  stats.value = res.data;
};

onMounted(() => {
  loadStats();
});
</script>
