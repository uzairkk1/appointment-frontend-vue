import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const accessToken = ref(null);
  const isAuthenticated = computed(() => user.value != undefined);

  return { user, accessToken, isAuthenticated };
});
