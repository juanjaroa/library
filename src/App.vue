<script setup>
import BooksTable from "./components/BooksTable.vue";
import BookForm from "./components/BookForm.vue";
</script>

<template>
  <BooksTable />
  <BookForm />
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
</style>
