import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { login } from "../services/apiAuth";
import { useSnackbar } from "./useSnackbar";
// by convention, composable function names start with "use"
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["user"], { ...data.user });
      //store user details in LS for persistance
      localStorage.setItem(
        "user_details",
        JSON.stringify({ accessToken: data?.accessToken, user: data?.user })
      );
      showSnackbar({
        text: "Login successfull, you will be redirected to dashboard shortly",
        color: "green",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    },
    onError: (err) => {
      const error = err.response.data;
      showSnackbar({
        text: error.message,
        color: "red",
      });
      console.log("useLogin: ", err);
    },
  });

  // expose managed state as return value
  return { signIn, isPending };
}
