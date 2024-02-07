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
      const { data, error } = await supabase.from("Books").select("*");
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
    async updateBook(book) {
      console.log("Updating book", book.id);
      console.log(book);

      const { data, error } = await supabase
        .from("Books")
        .update([book])
        .eq("id", book.id)
        .select();

      if (error) {
        console.error("Error updating book:", error.message, error.details);
      } else if (!data || data.length === 0) {
        console.warn("No book updated. Check if the ID exists.");
      } else {
        console.log("Updated", data);
        const index = this.books.findIndex((b) => b.id === book.id);
        if (index !== -1) {
          this.books[index] = data[0];
        }
      }
    },
    async deleteBook(bookId) {
      const { error } = await supabase.from("Books").delete().eq("id", bookId);
      if (error) {
        console.error("error deleting book", error.message, error.details);
      } else {
        let index = this.books.findIndex((book) => book.id === bookId);
        this.books.splice(index, 1);
      }
    },
  },
});
