<script setup>
import { defineEmits, defineProps, onMounted } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
const emit = defineEmits(["updateNav"]);
const props = defineProps(["isMdUp", "open", "rails"]);

const updateNavState = (state) => {
  emit("updateNav", state);
};

const getDrawerVal = () => {
  return props.isMdUp || props.open;
};

const menuItems = [
  {
    icon: "mdi-book-account-outline",
    title: "Appointments",
    value: "/appointments",
    show: true,
  },
  {
    icon: "mdi-doctor",
    title: "Doctors",
    value: "/doctors",
    show: true,
  },
  {
    icon: "mdi-card-account-details-outline",
    title: "Apply for Doctor",
    value: "/update/doctor",
    show: true,
  },
  {
    id: 0,
    icon: "mdi-logout",
    title: "Logout",
    value: "/logout",
    show: true,
  },
];
let user = { name: "test", email: "test" };
onMounted(() => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["user"]);
  user = data;
});
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
        prepend-avatar="https://randomuser.me/api/portraits/lego/3.jpg"
        :title="user.name"
        :subtitle="user.email"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <template :key="item.value" v-for="item in menuItems">
        <v-list-item
          active-class="active-route"
          :prepend-icon="item.icon"
          :value="item.value"
          :title="item.title"
          :to="item.value"
          :exact="true"
        >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
