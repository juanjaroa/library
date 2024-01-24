<template>
  <section v-if="!localSession?.data.session">
    <input
      type="email"
      name="email"
      id="email"
      v-model="email"
      placeholder="usuario@email.com"
    />
    <input
      type="password"
      name="pass"
      id="password"
      v-model="password"
      placeholder="contraseña"
    />
    <input type="submit" value="Login" @click="signIn" />
  </section>
  <section v-else>
    <p>
      {{ localSession.data.session.user.email }}
    </p>
    <button @click="signOut">cerrar sesion</button>
  </section>
</template>
<script setup>
import { supabase } from "@/lib/supabaseClient";
import { ref, onMounted } from "vue";

let email = ref("");
let password = ref("");
let localSession = ref(null);

async function getSession() {
  localSession.value = await supabase.auth.getSession();
}

async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log(error);
  } else {
    getSession();
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    email.value = "";
    password.value = "";
    localSession.value = null;
  }
}

onMounted(() => {
  getSession();
});
</script>
<style scoped></style>
