<template>
  <MainLayout>
    
    <div class="mb-4">
      <p class="font-bold">Table: {{ selectedTable?.name || 'Takeaway' }}</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <!-- PRODUCTS -->
      <div class="col-span-2 grid grid-cols-3 gap-4">
        <div
          v-for="p in products"
          :key="p.id"
          @click="addToCart(p)"
          class="bg-white p-4 rounded shadow cursor-pointer"
        >
          <h3 class="font-bold">{{ p.name }}</h3>
          <p class="text-green-600">$ {{ p.price }}</p>
        </div>
      </div>

      <!-- CART -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="font-bold mb-3">Cart</h2>

        <div v-for="item in cart" :key="item.id" class="mb-2">
          <p>{{ item.name }}</p>

          <div class="flex gap-2 items-center">
            <button @click="decrease(item)">-</button>
            <span>{{ item.qty }}</span>
            <button @click="increase(item)">+</button>
          </div>
        </div>

        <hr class="my-2" />

        <p class="font-bold">Total: ${{ total }}</p>

        <button @click="checkout" class="bg-green-600 text-white w-full mt-3 p-2">Checkout</button>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import MainLayout from '@/layouts/MainLayout.vue'

const products = ref([])
const cart = ref([])
const selectedTable = ref(null)
const router = useRouter();

// LOAD PRODUCTS
onMounted(async () => {
  const res = await api.get('/products')
  products.value = res.data
})

// ADD TO CART
const addToCart = (product) => {
  const item = cart.value.find((i) => i.id === product.id)

  if (item) {
    item.qty++
  } else {
    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    })
  }
}

// INCREASE
const increase = (item) => item.qty++

// DECREASE
const decrease = (item) => {
  item.qty--
  if (item.qty <= 0) {
    cart.value = cart.value.filter((i) => i.id !== item.id)
  }
}

// TOTAL
const total = computed(() => {
  return cart.value
    .reduce((sum, i) => {
      return sum + i.price * i.qty
    }, 0)
    .toFixed(2)
})

// CHECKOUT
const checkout = async () => {
  const res = await api.post("/orders", {
    items: cart.value,
    totalAmount: total.value,
    table: selectedTable.value,
  });

  cart.value = [];

  router.push(`/receipt/${res.data.order.id}`);
};
</script>
