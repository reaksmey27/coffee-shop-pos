<template>
  <div>
    <!-- Search -->
    <input
      v-model="search"
      @input="loadProducts"
      type="text"
      placeholder="Search coffee..."
      class="w-full p-3 mb-4 border rounded-lg"
    />

    <!-- Products -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        <!-- Image -->
        <img
          :src="product.image || 'https://via.placeholder.com/400x250?text=Coffee'"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />

        <!-- Content -->
        <div class="p-4">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-lg">
              {{ product.name }}
            </h3>

            <span
              v-if="product.isAvailable"
              class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full"
            >
              Available
            </span>

            <span
              v-else
              class="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full"
            >
              Out of Stock
            </span>
          </div>

          <p class="text-gray-500 text-sm mt-1">
            {{ product.category?.name || "No Category" }}
          </p>

          <div class="mt-3 flex items-center justify-between">
            <p class="text-xl font-bold text-green-600">
              ${{ product.price }}
            </p>

            <button
              @click="addToCart(product)"
              :disabled="!product.isAvailable"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              Add
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const products = ref([]);
const search = ref("");

// Load Products
const loadProducts = async () => {
  try {
    const res = await api.get("/products", {
      params: {
        search: search.value,
      },
    });

    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

// Add to Cart
const addToCart = (product) => {
  console.log("Added:", product);
};

onMounted(() => {
  loadProducts();
});
</script>