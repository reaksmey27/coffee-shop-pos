<template>
  <MainLayout>

    <h1 class="text-2xl font-bold mb-4">Tables</h1>

    <div class="grid grid-cols-4 gap-4">

      <div
        v-for="t in tables"
        :key="t.id"
        @click="selectTable(t)"
        class="p-4 rounded shadow cursor-pointer"
        :class="t.status === 'occupied' ? 'bg-red-200' : 'bg-green-200'"
      >
        {{ t.name }}
      </div>

    </div>

    <p class="mt-4">
      Selected: {{ selectedTable?.name || "None" }}
    </p>

  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import MainLayout from "@/layouts/MainLayout.vue";

const tables = ref([]);
const selectedTable = ref(null);

onMounted(async () => {
  const res = await api.get("/tables");
  tables.value = res.data;
});

const selectTable = (table) => {
  selectedTable.value = table;
};
</script>