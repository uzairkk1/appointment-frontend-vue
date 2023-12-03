<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["updateNav"]);
const props = defineProps(["isMdUp", "open", "rails"]);

const updateNavState = (state) => {
  emit("updateNav", state);
};

const getDrawerVal = () => {
  return props.isMdUp || props.open;
};
</script>
<template>
  <v-navigation-drawer
    :model-value="getDrawerVal()"
    expand-on-hover
    :rail="rails"
    mobile-breakpoint="sm"
    name="V-Nav"
    @update:modelValue="updateNavState"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
