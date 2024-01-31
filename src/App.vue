<script setup>
import { useRouter, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { ref } from "vue";
import SpeedDial from "primevue/speeddial";
import BooksTable from "./components/BooksTable.vue";
import BookForm from "./components/BookForm.vue";
import LoginForm from "./components/LoginForm.vue";

const router = useRouter();
const authStore = useAuthStore();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Login",
    icon: "pi pi-key",
    command: () => {
      router.push("/login");
    },
  },
  {
    label: "Agregar Libro",
    icon: "pi pi-book",
    command: () => {
      router.push("/add-book");
    },
  },
  /* {
    label: "Vue Website",
    icon: "pi pi-external-link",
    command: () => {
      window.location.href = "https://vuejs.org/";
    },
  }, */
]);
</script>

<template>
  <RouterView />

  <BookForm v-if="authStore.localSession?.data.session" />
  <BooksTable />
  <SpeedDial
    :model="items"
    :tooltipOptions="{ position: 'left' }"
    buttonClass="p-button-outlined"
    showIcon="pi pi-bars"
    hideIcon="pi pi-times"
    :radius="60"
    type="quarter-circle"
    direction="up-left"
    :style="{ right: '1rem', bottom: '1rem' }"
    :transitionDelay="125"
  />
</template>

<style scoped></style>
