<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

const drawer = ref(false);
</script>

<template>
  <div class="wrapper d-flex">
    <nav>
      <v-layout>
        <v-navigation-drawer
          image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
          permanent
          theme="dark"
        >
          <v-list nav>
            <v-list-item
              prepend-icon="mdi-email"
              title="Inbox"
              value="inbox"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-supervisor-circle"
              title="Supervisors"
              value="supervisors"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-clock-start"
              title="Clock-in"
              value="clockin"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </nav>
    <main>
      <div class="wrapper">
        <HelloWorld msg="You did it!" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </main>
  </div>

  <RouterView />
</template>

<style></style>
