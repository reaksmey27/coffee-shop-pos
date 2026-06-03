<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-4">Inventory</h1>

    <div class="grid grid-cols-3 gap-4">

      <div
        v-for="i in items"
        :key="i.id"
        class="bg-white p-4 rounded shadow"
      >

        <h2 class="font-bold">{{ i.name }}</h2>

        <p>Stock: {{ i.stock }} {{ i.unit }}</p>

        <p v-if="i.stock <= i.minStock" class="text-red-500">
          ⚠ Low Stock
        </p>

      </div>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const items = ref([]);

onMounted(async () => {
  const res = await api.get("/inventory");
  items.value = res.data;
});
</script>