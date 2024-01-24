<template>
  <section>
    <input type="text" name="id" placeholder="id" v-model="formData.id" />
    <input
      type="text"
      name="book"
      placeholder="Nombre del libro"
      v-model="formData.book"
    />
    <input
      type="text"
      name="author"
      placeholder="Nombre del autor"
      v-model="formData.author"
    />
    <input
      type="text"
      name="category"
      placeholder="Categoria"
      v-model="formData.category"
    />
    <input
      type="number"
      name="price"
      placeholder="Precio"
      v-model="formData.price"
    />
    <input
      type="number"
      name="pages"
      placeholder="Numero de paginas"
      v-model="formData.numberOfPages"
    />
    <input
      type="text"
      name="publisher"
      placeholder="Editorial"
      v-model="formData.publisher"
    />

    <input
      type="text"
      name="edition"
      placeholder="Edición"
      v-model="formData.edition"
    />

    <input
      type="text"
      name="dimensions"
      placeholder="Tamaño"
      v-model="formData.dimensions"
    />
    <fieldset>
      <legend>Seleccciona el tipo de portada:</legend>
      <div>
        <input
          type="radio"
          id="tapa-dura"
          name="coverType"
          value="tapa-dura"
          v-model="formData.coverType"
        />
        <label for="tapa-dura">Dura</label>
      </div>
      <div>
        <input
          type="radio"
          id="tapa-blanda"
          name="coverType"
          value="tapa-blanda"
          v-model="formData.coverType"
        />
        <label for="tapa-blanda">Blanda</label>
      </div>
    </fieldset>
    <fieldset class="vertical">
      <legend>Otras caracteristicas:</legend>
      <div class="status">
        <label for="is-new">Nuevo:</label>
        <input
          type="checkbox"
          name="is-new"
          id="is-new"
          v-model="formData.isNew"
        />
      </div>
      <div class="status">
        <label for="is-illustrated">Ilustrado:</label>
        <input
          type="checkbox"
          name="is-illustrated"
          id="is-illustrated"
          v-model="formData.isIllustrated"
        />
      </div>
      <div class="status">
        <label for="is-full-color">Full-color:</label>
        <input
          type="checkbox"
          name="is-full-color"
          id="is-full-color"
          v-model="formData.isFullColor"
        />
      </div>
    </fieldset>
    <input type="submit" value="Guardar" @click="handleSubmit" />
  </section>
</template>
<script setup>
import { reactive } from "vue";
import { useBookStore } from "@/stores/BookStore";

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

// Form fields model
let formData = reactive({
  id: "",
  book: "",
  author: "",
  category: "",
  isNew: false,
  price: "",
  numberOfPages: "",
  publisher: "",
  coverType: "",
  edition: "",
  isIllustrated: false,
  isFullColor: false,
  dimensions: "",
});

const createNewBook = () => {
  return {
    title: formData.book,
    author: formData.author,
    category: formData.category,
    is_new: formData.isNew,
    price: Number(formData.price),
    pages: Number(formData.numberOfPages),
    publisher: formData.publisher,
    cover_type: formData.coverType,
    edition: formData.edition,
    is_illustrated: formData.isIllustrated,
    is_full_color: formData.isFullColor,
    dimensions: formData.dimensions,
  };
};

const handleSubmit = () => {
  const newBook = createNewBook();
  bookStore.addBook(newBook);
  resetFormData();
};

// function to reset form data
const resetFormData = () => {
  formData.id = "";
  formData.book = "";
  formData.author = "";
  formData.category = "";
  formData.isNew = false;
  formData.price = "";
  formData.numberOfPages = "";
  formData.publisher = "";
  formData.coverType = "";
  formData.edition = "";
  formData.isIllustrated = false;
  formData.isFullColor = false;
  formData.dimensions = "";
};
</script>
<style scoped>
section > input,
div.status,
fieldset {
  width: 100%;
}
section > input {
  padding: 0.25rem 0.5rem;
}
div.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
input[type="checkbox"] {
  margin: 0;
}
input[type="radio"] {
  margin: 0 0.25rem 0 0;
}
fieldset {
  display: flex;
  gap: 1rem;
}
fieldset.vertical {
  flex-direction: column;
  gap: 0.5rem;
}
input[type="submit"] {
  margin-top: 1rem;
  color-scheme: light;
}
</style>
