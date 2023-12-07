<!-- eslint-disable -->
<script setup>
import { RouterView } from "vue-router";
import { useAppStore } from "./stores/App";
import { storeToRefs } from "pinia";
import SpinnerLoader from "./components/SpinnerLoader.vue";
import SnackBar from "./components/SnackBar.vue";

const appStore = useAppStore();
const { isLoading } = storeToRefs(appStore);
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
