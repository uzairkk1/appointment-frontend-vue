import axios from "axios";
import { useAppStore } from "./stores/App";

const axiosI = axios.create({
  baseURL: "http://localhost:3019/api/v1",
  headers: {
    Accept: "application/json",
  },
});

axiosI.interceptors.request.use((config) => {
  let appStore = useAppStore();
  appStore.enableLoading();
  return config;
});

axiosI.interceptors.response.use(
  (res) => {
    let appStore = useAppStore();
    appStore.disableLoading();
    return Promise.resolve(res);
  },
  (err) => {
    let appStore = useAppStore();
    appStore.disableLoading();
    return Promise.reject(err);
  }
);

export default axiosI;
