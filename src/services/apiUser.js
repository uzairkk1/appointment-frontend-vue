import axios from "../axios";

export async function getDoctors() {
  const { data } = await axios.get(`/users/doctors`);
  return data;
}
export async function getDoctor(id) {
  const { data } = await axios.get(`/users/doctors/${id}`);
  return data;
}
