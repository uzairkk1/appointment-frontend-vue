<script setup>
import SideBar from "../components/SideBar.vue";
import AppBar from "../components/AppBar.vue";
</script>
<template>
  <v-app>
    <SideBar />
    <AppBar />

    <v-main class="">
      <slot></slot>
    </v-main>
    <!-- <main>
      
    </main> -->
  </v-app>
</template>
