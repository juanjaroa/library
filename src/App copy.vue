<script setup>
import { reactive, ref, onMounted } from "vue";
import { useBookStore } from "@/stores/BookStore";
import { supabase } from "@/lib/supabaseClient";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

bookStore.fill();

// reactive object to store form data
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
    id: formData.id,
    book: formData.book,
    author: formData.author,
    category: formData.category,
    isNew: formData.isNew,
    price: formData.price,
    numberOfPages: formData.numberOfPages,
    publisher: formData.publisher,
    coverType: formData.coverType,
    edition: formData.edition,
    isIllustrated: formData.isIllustrated,
    isFullColor: formData.isFullColor,
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
  <section>
    <article v-for="book in bookStore.books" :key="book.id">
      <p v-show="book.id"><strong>Id:</strong> {{ book.id }}</p>
      <p v-show="book.book">
        <strong>Nombre del libro:</strong> {{ book.book }}
      </p>
      <p v-show="book.author"><strong>Autor:</strong> {{ book.author }}</p>
      <p v-show="book.category">
        <strong>Categoría:</strong> {{ book.category }}
      </p>
      <p v-show="book.price"><strong>Precio:</strong> {{ book.price }}</p>
      <p v-show="book.numberOfPages">
        <strong>Número de páginas:</strong> {{ book.numberOfPages }}
      </p>
      <p v-show="book.publisher">
        <strong>Editorial:</strong> {{ book.publisher }}
      </p>
      <p v-show="book.coverType">
        <strong>Tipo de portada:</strong> {{ book.coverType }}
      </p>
      <p v-show="book.edition"><strong>Edición:</strong> {{ book.edition }}</p>
      <p><strong>Ilustrado:</strong> {{ book.isIllustrated ? "Sí" : "No" }}</p>
      <p><strong>Full-color:</strong> {{ book.isFullColor ? "Sí" : "No" }}</p>
      <p v-show="book.dimensions">
        <strong>Dimensiones:</strong> {{ book.dimensions }}cm
      </p>
      <hr />
    </article>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  max-width: 600px;
  width: 50%;
  min-width: 300px;
}
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
