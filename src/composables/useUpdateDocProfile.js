import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateDocProfile } from "../services/apiAuth";
import { useSnackbar } from "./useSnackbar";
// by convention, composable function names start with "use"
export function useUpdateDocProfile() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate: updateDoctorProfile, isPending } = useMutation({
    mutationFn: updateDocProfile,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["user"], { ...data.data });

      let lsData = JSON.parse(localStorage.getItem("user_details"));
      //store user details in LS for persistance
      lsData.user = { ...data.data };

      localStorage.setItem(
        "user_details",
        JSON.stringify({ accessToken: lsData?.accessToken, user: lsData?.user })
      );

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
