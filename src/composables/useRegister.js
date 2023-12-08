import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { register } from "../services/apiAuth";
import { useSnackbar } from "./useSnackbar";
// by convention, composable function names start with "use"
export function useRegister() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      showSnackbar({
        text: "Signup successfull, Please confirm your email by clicking the link sent to you in email",
        color: "green",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    },
    onError: (err) => {
      const error = err.response.data;
      showSnackbar({
        text: error.message,
        color: "red",
      });
      console.log("useRegister: ", err);
    },
  });

  // expose managed state as return value
  return { signUp, isPending };
}
