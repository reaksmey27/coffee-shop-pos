<template>
  <div class="flex h-screen">

    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-4">

      <h1 class="text-xl font-bold mb-6">
        ☕ Coffee POS
      </h1>

      <nav class="space-y-3">
        <router-link to="/" class="block hover:text-green-400">
          Dashboard
        </router-link>

        <router-link to="/products" class="block hover:text-green-400">
          Products
        </router-link>

        <router-link to="/orders" class="block hover:text-green-400">
          Orders
        </router-link>

        <router-link to="/pos" class="block hover:text-green-400">
          POS
        </router-link>
      </nav>

      <button
        @click="logout"
        class="mt-10 bg-red-500 w-full p-2 rounded"
      >
        Logout
      </button>

    </aside>

    <!-- Content -->
    <main class="flex-1 bg-gray-100 p-6">
      <slot />
    </main>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>