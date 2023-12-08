<script setup>
import { defineProps } from "vue";
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="content__wrapper px-7 py-7 w-100 h-100">
    <slot name="loader">
      <template v-if="props.isLoading">
        <div class="w-100 h-100 d-flex align-center justify-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </slot>
    <slot name="error">
      <template v-if="props.isError">
        <v-card>
          <v-alert
            type="error"
            title="Error"
            text="Something went wrong please try again in few seconds"
          ></v-alert>
        </v-card>
      </template>
    </slot>
    <template v-if="!props.isError && !props.isLoading">
      <slot name="main"></slot>
    </template>
  </div>
</template>
