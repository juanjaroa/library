<script setup>
import { useRouter, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import SpeedDial from "primevue/speeddial";
import BooksTable from "./components/BooksTable.vue";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

onMounted(() => {
  authStore.getSession();
});

const router = useRouter();

const navItems = ref([
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
  <BooksTable />
  <SpeedDial
    :model="navItems"
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
