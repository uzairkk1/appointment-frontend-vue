import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

startApp();

async function startApp() {
  const app = createApp(App);
  // const pinia = ;
  // pinia.use(({ store }) => {
  //   store.router = markRaw(router);
  // });
  app.use(createPinia());

  app.use(vuetify);
  app.use(router);
  app.mount("#app");
}
