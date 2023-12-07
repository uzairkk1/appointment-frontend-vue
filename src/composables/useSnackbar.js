import { useAppStore } from "../stores/App";
// by convention, composable function names start with "use"
export function useSnackbar() {
  const appStore = useAppStore();
  const { showSnackbar } = appStore;

  // expose managed state as return value
  return { showSnackbar };
}
