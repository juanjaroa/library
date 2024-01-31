<template>
  <BookForm v-if="authStore.localSession?.data.session" />
  <h2 v-else>Ups... No estas autorizad@!</h2>
</template>
<script setup>
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();

import BookForm from "@/components/BookForm.vue";
</script>
<style scoped></style>
