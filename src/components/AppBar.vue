<script setup>
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["updateNav"]);
const props = defineProps(["isSmDown"]);

const openNav = () => {
  emit("updateNav");
};
</script>
<template>
  <v-app-bar title="Application bar">
    <template v-slot:prepend>
      <v-app-bar-nav-icon v-if="isSmDown" @click="openNav"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>
