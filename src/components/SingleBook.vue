<template>
  <Dialog
    v-model:visible="props.showBook.see"
    modal
    dismissableMask
    :style="{
      width: '40VW',
      border: 'none',
      background: 'none',
    }"
    :breakpoints="{
      '992px': '50vw',
      '768px': '60vw',
      '576px': '90vw',
    }"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }"
    :closeButtonProps="{ class: 'custom-close-button' }"
  >
    <Fieldset :legend="'ID: ' + currentBook.id">
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
    </Fieldset>
  </Dialog>

  <Dialog
    v-model:visible="props.showBook.edit"
    modal
    dismissableMask
    :style="{
      width: '75vw',
      border: 'none',
      background: 'none',
    }"
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
    :closeButtonProps="{ class: 'custom-close-button' }"
  >
    <BookForm :currentBook="currentBook" />
  </Dialog>
</template>
<script setup>
import BookForm from "@/components/BookForm.vue";
import Dialog from "primevue/dialog";
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
