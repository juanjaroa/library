<template>
  <DataTable
    v-model:filters="filters"
    paginator
    :rows="10"
    dataKey="id"
    :loading="loading"
    :globalFilterFields="['title', 'author', 'category']"
    :value="bookStore.books"
    resizableColumns
    columnResizeMode="expand"
    size="small"
    scrollable
    stripedRows
    removableSort
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <template #header>
      <div class="table-header">
        <img
          src="https://hrshkuejqqzfcwamsryo.supabase.co/storage/v1/object/public/library-assets/logo/casa-jaguar_logo-full.webp"
          height="50"
          alt="Casa Jaguar Tienda Andina"
        />
        <IconField iconPosition="left" class="search">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Buscar" />
        </IconField>
      </div>
    </template>
    <template #empty> No books found. </template>
    <template #loading> Loading books data. Please wait. </template>
    <Column
      field="title"
      header="Titulo"
      frozen
      sortable
      bodyClass="book-title"
    >
      <template #body="slotProps">
        <div class="title-container">
          <h4>
            {{ slotProps.data.title
            }}<Tag
              value="Nuevo!"
              severity="info"
              v-show="slotProps.data.is_new"
              style="vertical-align: middle; margin-left: 0.25rem"
            ></Tag>
          </h4>
        </div>
      </template>
    </Column>
    <Column field="author" header="Autor" sortable></Column>
    <Column field="category" header="Categoria" sortable>
      <template #body="slotProps">
        <h4>
          {{ slotProps.data.category }}
        </h4>
      </template>
    </Column>
    <Column field="price" header="Precio" sortable>
      <template #body="slotProps">
        <span style="font-weight: 600; color: var(--primary-color)"
          >${{ slotProps.data.price }}</span
        >
      </template>
    </Column>
    <Column header="Acciones" body-class="actions" header-class="centered">
      <template #body="slotProps">
        <div style="display: flex; gap: 0.5rem; justify-content: center">
          <Button
            icon="pi pi-eye"
            aria-label="See details"
            rounded
            outlined
            size="small"
            @click="selectBook(slotProps.data.id, 'see')"
          />
          <Button
            v-if="authStore.localSession?.data.session"
            icon="pi pi-pencil"
            aria-label="Edit book"
            rounded
            outlined
            size="small"
            @click="selectBook(slotProps.data.id, 'edit')"
          />
          <Button
            v-if="authStore.localSession?.data.session"
            icon="pi pi-trash"
            aria-label="Delete book"
            severity="danger"
            rounded
            outlined
            size="small"
            @click="confirmDelete($event, slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <SingleBook :showBook="showBook" v-if="showBook" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useBookStore } from "@/stores/BookStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Tag from "primevue/tag";
import SingleBook from "@/components/SingleBook.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();

const notifyDeleted = (title) => {
  toast.add({
    severity: "info",
    summary: "Libro eliminado",
    detail: `${title} se ha eliminado del catálogo.`,
    life: 5000,
  });
};

const confirmDelete = (event, book) => {
  confirm.require({
    target: event.currentTarget,
    message: `¿Quieres eliminar este libro con id=${book.id}?`,
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "Cancelar",
    acceptLabel: "Borrar",
    accept: () => {
      deleteBook(book);
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Cancelado",
        detail: "Haz cancelado la eliinación del libro",
        life: 3000,
      });
    },
  });
};

const authStore = useAuthStore();

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

const loading = ref(true);

onMounted(() => {
  bookStore.fill();
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  author: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  category: { value: null, matchMode: FilterMatchMode.IN },
});

const showBook = ref(null);

const selectBook = (bookId, mode) => {
  showBook.value = {
    id: bookId,
    see: mode === "see",
    edit: mode === "edit",
  };
};

const deleteBook = (book) => {
  bookStore.deleteBook(book.id);
  notifyDeleted(book.title);
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
  align-items: center;
  gap: 0.5rem 1rem;
  padding: 0.75rem 0.25rem;
  flex-wrap: wrap;
  span {
    font-size: 1.5rem;
  }
}

td,
th {
  text-align: left;
}
.book-title {
  .title-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
}

h4 {
  margin: 0;
}

.p-paginator-bottom {
  margin-top: 1rem;
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
    padding: 1.5rem 1.5rem 2.5rem;
    position: relative;
    border-radius: 0.5rem;
  }
  td {
    display: block;
    border: none;
    white-space: break-spaces;
  }

  td:nth-child(1),
  td:nth-child(2),
  td:nth-child(5) {
    grid-column-start: 1;
    grid-column-end: -1;
  }
  .actions > div {
    justify-content: flex-end;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
  .book-title {
    h4 {
      font-size: 1.5rem;
    }
  }
  .p-datatable-header {
    margin-bottom: 1rem;
    border-bottom: none;
    border-radius: 0.5rem;
  }
  .search {
    width: 100%;
  }
  .table-header {
    img {
      margin: 0 auto 1rem;
      width: 80%;
      max-width: 180px;
      height: auto;
    }
  }
}

@media (min-width: 768px) {
  td,
  th {
    padding: 0.5rem;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .book-title {
    min-width: max-content;
  }
}
</style>
