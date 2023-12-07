import axios from "axios";
import { useAppStore } from "./stores/App";
import { refreshToken } from "./services/apiAuth";

const axiosI = axios.create({
  baseURL: "http://localhost:3019/api/v1",
  headers: {
    Accept: "application/json",
  },
});

let userDetails = localStorage.getItem("user_details");
if (userDetails) {
  userDetails = JSON.parse(userDetails);
}

axiosI.defaults.headers.common["Authorization"] =
  `Bearer ${userDetails?.accessToken}` || "";

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
  async (error) => {
    let appStore = useAppStore();
    appStore.disableLoading();

    const originalRequest = error.config;
    const isTokenExpired = ["Your token has expired!", "jwt expired"].some(
      (msg) => error.response.data.message.includes(msg)
    );
    if (
      (error.response.status === 401 || error.response.status === 500) &&
      isTokenExpired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      //get refresh token
      const data = await refreshToken();
      //update auth headers
      axiosI.defaults.headers.common["Authorization"] =
        `Bearer ${data?.accessToken}` || "";
      //store user details in LS for persistance
      localStorage.setItem(
        "user_details",
        JSON.stringify({ accessToken: data?.accessToken, user: data?.user })
      );

      //update original request auth header with the new token
      originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;

      return axiosI(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosI;
