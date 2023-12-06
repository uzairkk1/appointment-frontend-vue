<template>
  <div class="text-center">
    <v-btn color="orange-darken-2" @click="showSnackbar({})">
      Open Snackbar
    </v-btn>

    <v-snackbar
      :color="snackbarDetails.color || 'green'"
      v-model="isSnackbarVisible"
      :timeout="snackbarDetails.timeout"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="hideSnackbar">
          <v-icon color="white" icon="mdi-close" size="large"></v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/App";
const appStore = useAppStore();
const { isSnackbarVisible, snackbarDetails } = storeToRefs(appStore);
const { hideSnackbar, showSnackbar } = appStore;
</script>
