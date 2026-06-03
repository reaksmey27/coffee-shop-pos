<template>
  <MainLayout>
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <div class="grid grid-cols-3 gap-4 mt-6">

      <div class="bg-white p-4 rounded shadow">
        ☕ Total Sales
      </div>

      <div class="bg-white p-4 rounded shadow">
        🧾 Orders
      </div>

      <div class="bg-white p-4 rounded shadow">
        💰 Revenue
      </div>

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
</script>