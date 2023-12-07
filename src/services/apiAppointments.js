import axios from "../axios";

export async function getAppointments() {
  const { data } = await axios.get(`/appointments`);

  return data;
}
