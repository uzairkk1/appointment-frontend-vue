import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import {
  createAppointment,
  acceptAppointment,
  rejectAppointment,
} from "../services/apiAppointments";
import { useSnackbar } from "./useSnackbar";
// by convention, composable function names start with "use"
export function useCreateAppointment() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { mutate: mutateCreateAppointment, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      showSnackbar({
        text: "Appointment booked successfully",
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
      console.log("useCreateAppointment: ", err);
    },
  });

  // expose managed state as return value
  return { mutateCreateAppointment, isPending };
}

export function useAcceptAppointment() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate: mutateAcceptAppointment, isPending } = useMutation({
    mutationFn: acceptAppointment,
    onSuccess: () => {
      showSnackbar({
        text: "Appointment accepted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) => {
      const error = err.response.data;
      showSnackbar({
        text: error.message,
        color: "red",
      });
      console.log("useAcceptAppointment: ", err);
    },
  });

  // expose managed state as return value
  return { mutateAcceptAppointment, isPending };
}
export function useRejectAppointment() {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate: mutateRejectAppointment, isPending } = useMutation({
    mutationFn: rejectAppointment,
    onSuccess: () => {
      showSnackbar({
        text: "Appointment rejected successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) => {
      const error = err.response.data;
      showSnackbar({
        text: error.message,
        color: "red",
      });
      console.log("useRejectAppointment: ", err);
    },
  });

  // expose managed state as return value
  return { mutateRejectAppointment, isPending };
}
