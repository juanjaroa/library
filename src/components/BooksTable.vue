<template>
  <DataTable
    :value="bookStore.books"
    resizableColumns
    columnResizeMode="expand"
    size="small"
  >
    <template #header>
      <div class="table-header">
        <span>Books</span>
        <Button icon="pi pi-refresh" rounded outlined />
      </div>
    </template>
    <template #empty> No books found. </template>
    <template #loading> Loading books data. Please wait. </template>
    <Column field="id" header="id"></Column>
    <Column field="title" header="Titulo"></Column>
    <Column field="author" header="Autor"></Column>
    <Column field="category" header="Categoria">
      <template #body="slotProps">
        <Tag rounded :value="slotProps.data.category"></Tag>
      </template>
    </Column>
    <Column field="price" header="Precio">
      <template #body="slotProps">
        <span style="font-weight: 600; color: var(--highlight-text-color)"
          >${{ slotProps.data.price }}</span
        >
      </template>
    </Column>
    <Column header="acciones">
      <template #body="slotProps">
        <div style="display: flex; gap: 0.5rem">
          <Button
            icon="pi pi-pencil"
            aria-label="Edit book"
            rounded
            outlined
            size="small"
            severity="secondary"
            @click="selectBook(slotProps.data.id, 'toEdit')"
          />
          <Button
            icon="pi pi-eye"
            aria-label="See details"
            rounded
            outlined
            size="small"
            @click="selectBook(slotProps.data.id, 'toSee')"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <SingleBook
    :showBook="showBook"
    v-if="showBook"
    @null-book="showBook = null"
  />

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
import { reactive } from "vue";
import { useBookStore } from "@/stores/BookStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import SingleBook from "@/components/SingleBook.vue";

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

bookStore.fill();

const showBook = reactive(null);

const selectBook = (bookId, mode) => {
  showBook = {
    id: bookId,
    mode: mode,
  };
};
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

.p-datatable {
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.75rem 0.25rem;
  span {
    font-size: 1.5rem;
  }
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
    display: grid;
    gap: 0 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  td {
    display: block;
    border: none;
    white-space: break-spaces;
  }
  td:nth-child(1) {
  }
  td:nth-child(2),
  td:nth-child(3),
  td:nth-child(6) {
    grid-column-start: 1;
    grid-column-end: -1;
  }
}

@media (min-width: 768px) {
  td,
  th {
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
}
</style>
