<template>
  <MainLayout>

    <div class="max-w-md mx-auto bg-white p-6 shadow">

      <h1 class="text-center font-bold text-xl">
        ☕ Coffee Shop Receipt
      </h1>

      <p class="text-center text-sm mt-1">
        Order #{{ order.id }}
      </p>

      <hr class="my-3" />

      <p>
        Table:
        {{ order.table?.name || "Takeaway" }}
      </p>

      <hr class="my-3" />

      <div v-for="item in order.items" :key="item.id">
        <div class="flex justify-between">
          <span>
            {{ item.name }} x {{ item.qty }}
          </span>

          <span>
            ${{ item.price * item.qty }}
          </span>
        </div>
      </div>

      <hr class="my-3" />

      <div class="flex justify-between font-bold">
        <span>Total</span>
        <span>${{ order.totalAmount }}</span>
      </div>

      <button
        @click="print"
        class="mt-4 bg-green-600 text-white w-full p-2"
      >
        Print Receipt
      </button>

    </div>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const route = useRoute();
const order = ref({ items: [] });

onMounted(async () => {
  const res = await api.get(`/orders/${route.params.id}`);
  order.value = res.data;
});

const print = () => {
  window.print();
};
</script>