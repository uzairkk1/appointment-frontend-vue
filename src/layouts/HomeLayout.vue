<script setup>
import SideBar from "../components/SideBar.vue";
import AppBar from "../components/AppBar.vue";
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";

const isNavOpen = ref(false);
const isNavRail = ref(false);

const onUpdateNav = (state) => {
  if (state != undefined) {
    isNavOpen.value = state;
  } else {
    isNavOpen.value = !isNavOpen.value;
    isNavRail.value = false;
  }
};

const display = useDisplay({ mobileBreakpoint: "sm" });

watch(
  () => display.smAndDown.value,
  (val) => {
    if (val) {
      isNavRail.value = false;
    } else {
      isNavRail.value = true;
    }
  }
);
watch(
  () => display.mdAndDown.value,
  (val) => {
    if (val) {
      isNavRail.value = true;
    } else {
      isNavRail.value = false;
    }
  }
);
</script>
<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <SideBar
        @update-nav="onUpdateNav"
        :is-md-up="display.mdAndUp.value"
        :rails="isNavRail"
        :open="isNavOpen"
      />
      <AppBar @update-nav="onUpdateNav" :is-sm-down="display.smAndDown.value" />

      <v-main>
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>
