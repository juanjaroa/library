import { defineStore } from "pinia";
import { supabase } from "@/lib/supabaseClient";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    email: "",
    localSession: null,
  }),

  actions: {
    async getSession() {
      this.localSession = await supabase.auth.getSession();
      if (this.localSession.data.session !== null) {
        this.email = this.localSession.data.session.user.email;
      }
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("holi", error);
      } else {
        this.getSession();
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
      } else {
        this.email = "";
        this.password = "";
        this.localSession = null;
      }
    },
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
  },
});
