import { useMutation } from "@tanstack/vue-query";
import { updateDocProfile } from "../services/apiAuth";
import { useSnackbar } from "./useSnackbar";
// by convention, composable function names start with "use"
export function useUpdateDocProfile() {
  const { showSnackbar } = useSnackbar();

  const { mutate: updateDoctorProfile, isPending } = useMutation({
    mutationFn: updateDocProfile,
    onSuccess: () => {
      showSnackbar({
        text: "Your profile has been updated successfully",
        color: "green",
      });
    },
    onError: (err) => {
      const error = err.response.data;
      showSnackbar({
        text: error.message,
        color: "red",
      });
      console.log("useUpdateDocProfile: ", err);
    },
  });

  // expose managed state as return value
  return { updateDoctorProfile, isPending };
}
