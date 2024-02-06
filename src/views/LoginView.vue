<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :style="{ width: '400px', border: 'none', background: 'none' }"
    :breakpoints="{
      '1400px': '30vw',
      '1200px': '40vw',
      '992px': '50vw',
      '768px': '66vw',
      '576px': '85vw',
    }"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
    @hide="router.push('/')"
  >
    <template #container="{ closeCallback }">
      <LoginForm />
    </template>
  </Dialog>
</template>
<script setup>
import Dialog from "primevue/dialog";
import LoginForm from "@/components/LoginForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

import { ref } from "vue";

const visible = ref(true);
</script>
<style scoped></style>
