<template>
  <div class="flex h-screen">

    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-4">
      <h2 class="text-xl font-bold mb-6">☕ POS System</h2>

      <nav class="space-y-3">
        <a href="#" class="block">Dashboard</a>
        <a href="#" class="block">Products</a>
        <a href="#" class="block">Orders</a>
        <a href="#" class="block">POS</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 bg-gray-100 p-6">
      <slot />
    </main>

  </div>
</template>