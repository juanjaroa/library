<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :style="{ width: '75vw', border: 'none', background: 'none' }"
    :breakpoints="{
      '1400px': '80vw',
      '1200px': '85vw',
      '992px': '85vw',
      '768px': '90vw',
      '576px': '90vw',
    }"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
    @hide="router.push('/')"
    :closeButtonProps="{ class: 'custom-close-button' }"
  >
    <BookForm v-if="authStore.localSession?.data.session" />
    <h2 v-else>Ups... No estas autorizad@!</h2>
  </Dialog>
</template>
<script setup>
import Dialog from "primevue/dialog";
import BookForm from "@/components/BookForm.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";

const router = useRouter();

import { ref } from "vue";

const visible = ref(true);
const authStore = useAuthStore();
</script>
<style scoped></style>
