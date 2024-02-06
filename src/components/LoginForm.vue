<template>
  <Fieldset
    legend="Iniciar sesion"
    class="login"
    v-if="!authStore.localSession?.data.session"
  >
    <span class="p-float-label">
      <InputText
        id="usermail"
        type="email"
        v-model="email"
        placeholder="usuario@email.com"
        class="w-full"
      />
      <label for="usermail">email del usuario</label>
    </span>
    <span class="p-float-label">
      <Password id="password" v-model="password" :feedback="false" toggleMask />
      <label for="password">Contraseña</label>
    </span>
    <Button
      @click="signIn"
      size="small"
      icon="pi pi-key"
      label="Login"
      outlined
    />
  </Fieldset>
  <Fieldset legend="Sesion iniciada" class="login" v-else>
    <p style="text-align: center">
      {{ authStore.getEmail }}
    </p>
    <Button
      @click="signOut"
      size="small"
      label="Cerrar sesion"
      severity="danger"
      outlined
    />
  </Fieldset>
  <Button
    icon="pi pi-times"
    rounded
    size="small"
    class="close-modal"
    @click="closeModal"
  />
</template>
<script setup>
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const authStore = useAuthStore();

onMounted(() => {
  authStore.getSession();
});

const signIn = async () => {
  await authStore.signIn(email.value, password.value);
};

const signOut = async () => {
  await authStore.signOut();
  closeModal();
};

const closeModal = () => {
  setTimeout(() => {
    router.push("/");
  }, 0);
};
</script>
<style>
fieldset {
  button {
    justify-content: center;
    span.p-button-label {
      max-width: fit-content;
      flex-grow: 0;
    }
  }
}
</style>
