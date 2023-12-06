import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app-store", () => {
  const isLoading = ref(false);
  const isSnackbarVisible = ref(false);
  const snackbarDetails = ref({
    text: "",
    location: "",
    color: "green",
    timeout: 2000,
  });

  function showSnackbar(details) {
    isSnackbarVisible.value = true;
    snackbarDetails.value = { ...snackbarDetails.value, ...details };
  }
  function hideSnackbar() {
    isSnackbarVisible.value = false;
    snackbarDetails.value = { text: "", location: "", timeout: 2000 };
  }
  function enableLoading() {
    isLoading.value = true;
  }
  function disableLoading() {
    isLoading.value = false;
  }

  return {
    isLoading,
    isSnackbarVisible,
    snackbarDetails,
    showSnackbar,
    hideSnackbar,
    enableLoading,
    disableLoading,
  };
});
