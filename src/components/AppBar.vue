<script setup>
import { defineEmits, defineProps } from "vue";
import { useRoute } from "vue-router";
const emit = defineEmits(["updateNav"]);
const props = defineProps(["isSmDown"]);

//routes
const route = useRoute();

const openNav = () => {
  emit("updateNav");
};

const getCurrentTitle = () => {
  const routeName = route.name;
  switch (routeName) {
    case "appointments":
      return "Appointments";
    default:
      return "Application";
  }
};
</script>
<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon v-if="isSmDown" @click="openNav"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>{{ getCurrentTitle() }}</v-app-bar-title>
  </v-app-bar>
</template>
