// En un nuevo archivo, por ejemplo, stores/catalog.js
import { defineStore } from "pinia";

import { supabase } from "@/lib/supabaseClient";

export const useBookStore = defineStore("BookStore", {
  state: () => {
    return {
      books: [],
    };
  },
  actions: {
    async fill() {
      const { data } = await supabase.from("Books").select("*");
      this.books = data;
    },
    async addBook(newBook) {
      // Insert a new book into the 'Books' table
      const { data, error } = await supabase
        .from("Books")
        .insert([newBook])
        .select();

      if (error) {
        console.error("Error adding book:", error);
      } else {
        // Update the local store with the newly added book
        this.books.push(data[0]);
      }
    },
  },
});
