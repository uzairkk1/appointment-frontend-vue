<script setup>
import { defineEmits, defineProps } from "vue";
import { useUser } from "../composables/useUser";
const emit = defineEmits(["updateNav"]);
const props = defineProps(["isMdUp", "open", "rails"]);

const updateNavState = (state) => {
  emit("updateNav", state);
};

const { user, isLoading, isError } = useUser();

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
    show: () => user.value.role === "DOCTOR",
  },
  {
    id: 0,
    icon: "mdi-logout",
    title: "Logout",
    value: "/logout",
    show: true,
  },
];
// onMounted(() => {
//   const queryClient = useQueryClient();
//   const data = queryClient.getQueryData(["user"]);
//   user = data;
// });
</script>
<template>
  <div class="w-100 h-100 d-flex align-center justify-center" v-if="isLoading">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>

  <v-navigation-drawer
    v-else
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
          v-if="typeof item.show == 'function' ? item.show() : item.show"
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
