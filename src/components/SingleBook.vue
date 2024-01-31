<!-- DetallesLibro.vue -->
<script setup>
import { ref, computed } from "vue";
import { useBookStore } from "@/stores/BookStore";

const booksStore = useBookStore();
const props = defineProps(["showBook"]);

const currentBook = computed(() => {
  return booksStore.books.find((book) => book.id === props.showBook.id);
});

const emit = defineEmits(["null-book"]);

function closeBook() {
  emit("null-book");
}
</script>

<template>
  <div v-if="currentBook">
    <h2>{{ currentBook.title }}</h2>
    <p>Autor: {{ currentBook.author }}</p>
    <!-- Otros detalles del libro -->
  </div>
  <p v-else>Libro no encontrado</p>
  <button @click="closeBook">close</button>
</template>
