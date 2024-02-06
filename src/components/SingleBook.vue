<template>
  <div
    class="single-book-container"
    v-if="currentBook && props.showBook.mode === 'toSee'"
  >
    <h2>{{ currentBook.title }}</h2>
    <h3>{{ currentBook.author }}</h3>
    <p>Genero: {{ currentBook.category }}</p>
    <p>Nuevo: {{ currentBook.is_new ? "Sí" : "No" }}</p>
    <p>Precio: ${{ currentBook.price }}</p>
    <p>Páginas: {{ currentBook.pages }}</p>
    <p>Editorial: {{ currentBook.publisher }}</p>
    <p>Tipo de cubierta: {{ currentBook.cover_type }}</p>
    <p>Edición: {{ currentBook.edition }}</p>
    <p>Ilustrado: {{ currentBook.is_illustrated ? "Sí" : "No" }}</p>
    <p>Full color: {{ currentBook.is_full_color ? "Sí" : "No" }}</p>
    <p>Dimensiones: {{ currentBook.dimensions }}cms</p>
  </div>
  <div
    v-else-if="currentBook && props.showBook.mode === 'toEdit'"
    class="scrollable-dialog"
  >
    <BookForm :currentBook="currentBook" />
  </div>
  <p v-else>Libro no encontrado</p>
</template>
<script setup>
import BookForm from "@/components/BookForm.vue";
import Fieldset from "primevue/fieldset";
import { computed } from "vue";
import { useBookStore } from "@/stores/BookStore";

const booksStore = useBookStore();
const props = defineProps(["showBook"]);

const currentBook = computed(() => {
  return booksStore.books.find((book) => book.id === props.showBook.id);
});
</script>
<style scoped>
.single-book-container {
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 3rem;
  border-radius: 1rem;
  backdrop-filter: blur(0.5rem);
}
</style>
