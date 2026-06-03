<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-4">Products</h1>

    <div class="grid grid-cols-3 gap-4">

      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white p-4 rounded shadow"
      >
        <h2 class="font-bold">{{ p.name }}</h2>
        <p class="text-green-600">$ {{ p.price }}</p>
      </div>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const products = ref([]);

onMounted(async () => {
  const res = await api.get("/products");
  products.value = res.data;
});
</script>