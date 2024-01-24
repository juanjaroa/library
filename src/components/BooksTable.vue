<template>
  <DataTable
    :value="bookStore.books"
    size="small"
    dataKey="id"
    resizableColumns
    columnResizeMode="expand"
  >
    <template #empty> No books found. </template>
    <template #loading> Loading books data. Please wait. </template>
    <Column field="id" header="id"></Column>
    <Column field="title" header="Titulo"></Column>
    <Column field="author" header="Autor"></Column>
    <Column field="category" header="Categoria"></Column>
    <Column field="price" header="Precio">
      <template #body="slotProps">
        <span style="font-weight: 600; color: var(--highlight-text-color)"
          >${{ slotProps.data.price }}</span
        >
      </template>
    </Column>
    <Column header="acciones">
      <template #body="slotProps">
        <button>edit</button>
      </template>
    </Column>
  </DataTable>
  <!-- <section>
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
  </section> -->
</template>
<script setup>
import { useBookStore } from "@/stores/BookStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

bookStore.fill();
</script>
<style>
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

td,
th {
  text-align: left;
}

@media (max-width: 767px) {
  tbody {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  thead {
    display: none;
  }
  tr {
    display: flex;
    flex-wrap: wrap;
    gap: 0 0.5rem;
  }
  td {
    max-width: fit-content;
  }
  td:nth-child(1) {
    display: none;
  }
  td:nth-child(2),
  td:nth-child(3) {
    flex-grow: 2;
  }
}

@media (min-width: 768px) {
  td,
  th {
    padding: 0 0.65rem;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
}
</style>
