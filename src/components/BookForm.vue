<template>
  <section>
    <Fieldset class="grid" :legend="formData.title || ''">
      <span class="p-float-label">
        <InputText
          type="text"
          name="book-id"
          id="book-id"
          v-model="formData.id"
          placeholder="0000"
          class="w-full"
          size="small"
        />
        <label for="book-id">Id del Libro</label>
      </span>
      <span class="p-float-label">
        <InputText
          type="text"
          name="book-title"
          id="book-title"
          v-model="formData.title"
          placeholder="Increible historia"
          class="w-full"
          size="small"
        />
        <label for="book-title">Titulo del libro</label>
      </span>
      <span class="p-float-label">
        <InputText
          type="text"
          name="author"
          id="author"
          v-model="formData.author"
          placeholder="Jane Doe"
          class="w-full"
          size="small"
        />
        <label for="author">Nombre del autor</label>
      </span>
      <span class="p-float-label">
        <InputText
          type="text"
          name="category"
          id="category"
          v-model="formData.category"
          placeholder="Crónica"
          class="w-full"
          size="small"
        />
        <label for="category">Categoria / Genero</label>
      </span>
      <span class="p-float-label">
        <InputNumber
          name="price"
          id="price"
          v-model="formData.price"
          class="w-full"
          size="small"
        />
        <label for="price">Precio</label>
      </span>
      <span class="p-float-label">
        <InputNumber
          name="pages"
          id="pages"
          v-model="formData.pages"
          class="w-full"
          size="small"
        />
        <label for="pages">Numero de paginas</label>
      </span>
      <span class="p-float-label">
        <InputText
          name="publisher"
          id="publisher"
          v-model="formData.publisher"
          placeholder="Editorial Jaguar"
          class="w-full"
          size="small"
        />
        <label for="publisher">Editorial</label>
      </span>
      <span class="p-float-label">
        <InputText
          name="edition"
          id="edition"
          v-model="formData.edition"
          placeholder="Primera"
          class="w-full"
          size="small"
        />
        <label for="edition">Edición</label>
      </span>
      <span class="p-float-label">
        <InputText
          name="dimensions"
          id="dimensions"
          v-model="formData.dimensions"
          placeholder="25x18,6"
          class="w-full"
          size="small"
        />
        <label for="dimensions">Tamaño</label>
      </span>
    </Fieldset>

    <div class="fieldsets-container">
      <Fieldset legend="Tipo de portada" class="cover">
        <label>
          <RadioButton
            v-model="formData.cover_type"
            inputId="type-1"
            name="cover-type"
            value="Dura"
          />
          Dura</label
        >
        <label>
          <RadioButton
            v-model="formData.cover_type"
            inputId="type-2"
            name="cover-type"
            value="Semi-dura"
          />
          Semi-dura</label
        >
        <label>
          <RadioButton
            v-model="formData.cover_type"
            inputId="type-3"
            name="cover-type"
            value="Blanda"
          />
          Blanda</label
        >
      </Fieldset>

      <Fieldset legend="Otras caracteristicas" class="others">
        <label for="is-new"
          >Nuevo:
          <Checkbox
            v-model="formData.is_new"
            name="is-new"
            inputId="is-new"
            :binary="true"
          />
        </label>
        <label for="is-illustrated"
          >Ilustrado:
          <Checkbox
            v-model="formData.is_illustrated"
            name="is-illustrated"
            inputId="is-illustrated"
            :binary="true"
          />
        </label>
        <label for="is-full-color"
          >Full-color:
          <Checkbox
            v-model="formData.is_full_color"
            name="is-full-color"
            inputId="is-full-color"
            :binary="true"
          />
        </label>
      </Fieldset>
    </div>
    <Button
      label="Actualizar"
      outlined
      class="w-full"
      @click="handleUpdate"
      v-if="props.currentBook"
    />
    <Button
      label="Guardar"
      outlined
      class="w-full"
      @click="handleSubmit"
      v-else
    />
  </section>
</template>
<script setup>
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Fieldset from "primevue/fieldset";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { reactive, onMounted } from "vue";
import { useBookStore } from "@/stores/BookStore";

const props = defineProps({
  currentBook: {
    type: Object,
    default: null, // Set a default value for currentBook
  },
});

// Obtiene la referencia al store de catálogo
const bookStore = useBookStore();

// Form fields model
let formData = reactive({
  id: "",
  title: "",
  author: "",
  category: "",
  is_new: false,
  price: null,
  pages: null,
  publisher: "",
  cover_type: "",
  edition: "",
  is_illustrated: false,
  is_full_color: false,
  dimensions: "",
});

const createNewBook = () => {
  return {
    title: formData.title,
    author: formData.author,
    category: formData.category,
    is_new: formData.is_new,
    price: Number(formData.price),
    pages: Number(formData.pages),
    publisher: formData.publisher,
    cover_type: formData.cover_type,
    edition: formData.edition,
    is_illustrated: formData.is_illustrated,
    is_full_color: formData.is_full_color,
    dimensions: formData.dimensions,
  };
};

const updateBook = () => {
  return {
    id: formData.id,
    title: formData.title,
    author: formData.author,
    category: formData.category,
    is_new: formData.is_new,
    price: Number(formData.price),
    pages: Number(formData.pages),
    publisher: formData.publisher,
    cover_type: formData.cover_type,
    edition: formData.edition,
    is_illustrated: formData.is_illustrated,
    is_full_color: formData.is_full_color,
    dimensions: formData.dimensions,
  };
};

const handleSubmit = () => {
  const newBook = createNewBook();
  bookStore.addBook(newBook);
  resetFormData();
};

const handleUpdate = () => {
  const book = updateBook();
  bookStore.updateBook(book);
};

// function to reset form data
const resetFormData = () => {
  formData.id = "";
  formData.title = "";
  formData.author = "";
  formData.category = "";
  formData.is_new = false;
  formData.price = null;
  formData.pages = null;
  formData.publisher = "";
  formData.cover_type = "";
  formData.edition = "";
  formData.is_illustrated = false;
  formData.is_full_color = false;
  formData.dimensions = "";
};

onMounted(() => {
  if (props.currentBook) {
    Object.assign(formData, props.currentBook);
  }
});
</script>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  margin-top: 1rem;
}
</style>
