<script setup>
import SpinnerLoader from "./components/SpinnerLoader.vue";
import MainComp from "./Main.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <MainComp />
    </template>
    <template #fallback>
      <!-- Fallback content while the async operation is in progress -->
      <SpinnerLoader />
    </template>
  </Suspense>
</template>

<style></style>
