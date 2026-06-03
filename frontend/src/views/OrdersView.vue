<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-4">Orders</h1>

    <div v-for="o in orders" :key="o.id"
      class="bg-white p-4 mb-3 rounded shadow">

      <p class="font-bold">
        Order #{{ o.id }} - ${{ o.totalAmount }}
      </p>

      <p>Status: {{ o.status }}</p>

      <div class="flex gap-2 mt-2">

        <button @click="update(o.id, 'preparing')"
          class="bg-yellow-500 text-white px-2">
          Preparing
        </button>

        <button @click="update(o.id, 'ready')"
          class="bg-blue-500 text-white px-2">
          Ready
        </button>

        <button @click="update(o.id, 'completed')"
          class="bg-green-600 text-white px-2">
          Done
        </button>

      </div>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const orders = ref([]);

const loadOrders = async () => {
  const res = await api.get("/orders");
  orders.value = res.data;
};

onMounted(loadOrders);

// UPDATE STATUS
const update = async (id, status) => {
  await api.put(`/orders/${id}/status`, { status });
  loadOrders();
};
</script>