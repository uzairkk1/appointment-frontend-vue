<script setup>
import SideBar from "../components/SideBar.vue";
</script>
<template>
  <v-layout>
    <SideBar />
    <v-main class="">
      <slot></slot>
    </v-main>
    <!-- <main>
      
    </main> -->
  </v-layout>
</template>
