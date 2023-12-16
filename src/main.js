import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "v-calendar/style.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

function startApp() {
  const app = createApp(App);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnMount: false,
      },
    },
  });
  app.provide("queryClient", queryClient);
  app.use(createPinia());
  app.use(VueQueryPlugin, { queryClient });
  // app.use(setupCalendar, {});

  app.use(vuetify);
  app.use(router);
  app.mount("#app");

  return app;
}

const app = startApp();

export default app;
