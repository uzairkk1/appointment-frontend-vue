import axios from "../axios";

export async function getDoctors() {
  const { data } = axios.get(`/users/doctors`);
  return data;
}
