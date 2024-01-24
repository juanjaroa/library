<template>
  <section>
    <article v-for="book in bookStore.books" :key="book.id">
      <p v-show="book.id"><strong>Id:</strong> {{ book.id }}</p>
      <p v-show="book.title">
        <strong>Nombre del libro:</strong> {{ book.title }}
      </p>
      <p v-show="book.author"><strong>Autor:</strong> {{ book.author }}</p>
      <p v-show="book.category">
        <strong>Categoría:</strong> {{ book.category }}
      </p>
      <p v-show="book.price"><strong>Precio:</strong> {{ book.price }}</p>
      <p v-show="book.pages">
        <strong>Número de páginas:</strong> {{ book.pages }}
      </p>
      <p v-show="book.publisher">
        <strong>Editorial:</strong> {{ book.publisher }}
      </p>
      <p v-show="book.cover_type">
        <strong>Tipo de portada:</strong> {{ book.cover_type }}
      </p>
      <p v-show="book.edition"><strong>Edición:</strong> {{ book.edition }}</p>
      <p><strong>Ilustrado:</strong> {{ book.is_illustrated ? "Sí" : "No" }}</p>
      <p><strong>Full-color:</strong> {{ book.is_full_color ? "Sí" : "No" }}</p>
      <p v-show="book.dimensions">
        <strong>Dimensiones:</strong> {{ book.dimensions }}cm
      </p>
      <hr />
    </article>
  </section>
</template>
<script setup>
import { useBookStore } from "@/stores/BookStore";

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

bookStore.fill();
</script>
<style scoped>
article {
  width: 100%;
}
article p {
  text-align: left;
  margin: 0;
}
article hr {
  margin: 0.75rem 0 0;
}
article:last-of-type hr {
  display: none;
}
</style>
