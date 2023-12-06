<!-- eslint-disable -->
<script setup>
import { RouterView } from "vue-router";
import { useAppStore } from "./stores/App";
import { useAuthStore } from "./stores/Auth";
import { storeToRefs } from "pinia";
import SpinnerLoader from "./components/SpinnerLoader.vue";
import SnackBar from "./components/SnackBar.vue";

const appStore = useAppStore();
const { isLoading } = storeToRefs(appStore);

//check for login
try {
  const authRef = localStorage.getItem("ref_auth");
  if (authRef && JSON.parse(authRef) === true) {
    const authStore = useAuthStore();
    await authStore.refresh();
  }
} catch (err) {
  console.log("ERROR FROM MAIN", err);
}
</script>

<template>
  <SpinnerLoader v-if="isLoading" />
  <SnackBar />
  <!-- eslint-disable -->
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>

<style></style>
