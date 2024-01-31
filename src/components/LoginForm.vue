<template>
  <section v-if="!authStore.localSession?.data.session">
    <form @submit.prevent>
      <Fieldset legend="Iniciar sesion" class="login">
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
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
          />
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
    </form>
  </section>
  <section v-else>
    <p>
      {{ authStore.getEmail }}
    </p>
    <Button
      @click="signOut"
      size="small"
      label="Cerrar sesion"
      severity="danger"
      outlined
    />
  </section>
</template>
<script setup>
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/AuthStore";
import { ref, onMounted } from "vue";

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
};
</script>
<style>
form {
  min-height: 33vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  button {
    justify-content: center;
    span.p-button-label {
      max-width: fit-content;
      flex-grow: 0;
    }
  }
}
</style>
