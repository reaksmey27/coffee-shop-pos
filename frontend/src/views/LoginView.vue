<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white p-6 rounded shadow w-96">

      <h1 class="text-2xl font-bold mb-4">Login</h1>

      <input v-model="email" placeholder="Email"
        class="border p-2 w-full mb-2" />

      <input v-model="password" type="password" placeholder="Password"
        class="border p-2 w-full mb-4" />

      <button @click="login"
        class="bg-green-600 text-white w-full p-2">
        Login
      </button>

      <p class="text-red-500 mt-2">{{ error }}</p>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);

    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>