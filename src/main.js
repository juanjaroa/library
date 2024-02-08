import "./style.css";
import { createApp } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import ToastService from "primevue/toastservice";
import "primevue/resources/themes/aura-dark-amber/theme.css"; // Tema
import "primevue/resources/primevue.min.css"; // Estilos generales
import "primeicons/primeicons.css"; // Iconos

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(PrimeVue, { inputStyle: "outlined", ripple: true });
app.use(ToastService);
app.mount("#app");
