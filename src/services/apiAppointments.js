import axios from "../axios";

export async function getAppointments() {
  const { data } = await axios.get(`/appointments`);

  return data;
}

export async function getBookingSlots({ docId, date }) {
  const { data } = await axios.get(`/appointments?docId=${docId}&date=${date}`);
  return data;
}
export async function createAppointment(data) {
  return axios.post(`/appointments`, data);
}
export async function acceptAppointment(id) {
  return axios.patch(`/appointments/update/${id}`, {
    status: "ACCEPTED",
  });
}
export async function rejectAppointment(id) {
  return axios.patch(`/appointments/update/${id}`, {
    status: "REJECTED",
  });
}
