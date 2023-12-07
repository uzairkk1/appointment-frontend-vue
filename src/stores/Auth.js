import { ref, computed } from "vue";
import { defineStore } from "pinia";
// import axios from "./../axios";
// import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  // const router = useRouter();
  const user = ref(null);
  const accessToken = ref(null);
  const isRefreshing = ref(null);
  const isAuthenticated = computed(() => user.value != undefined);
  //not being used
  // const login = async (email, password) => {
  //   const res = await axios.post(
  //     `/users/auth/login`,
  //     {
  //       email,
  //       password,
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     }
  //   );
  //   // update pinia state
  //   user.value = res.data.user;
  //   accessToken.value = res.data.accessToken;

  //   //store auth state in LS so we dont call refresh token everytime on page refresh
  //   localStorage.setItem("ref_auth", true);
  //   // redirect to previous url or default to home page
  //   console.log(router);
  //   router.push("/");
  // };

  // const refresh = async () => {
  //   isRefreshing.value = true;
  //   return axios
  //     .get("/users/auth/refresh", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       user.value = res.data.user;
  //       accessToken.value = res.data.accessToken;

  //       //store auth state in LS so we dont call refresh token everytime on page refresh
  //       localStorage.setItem("ref_auth", true);
  //       isRefreshing.value = false;
  //     })
  //     .catch((err) => {
  //       console.log("Refresh Error", err);
  //       localStorage.setItem("ref_auth", false);
  //       user.value = null;
  //       accessToken.value = null;
  //       isRefreshing.value = false;
  //     });
  // };

  return { user, accessToken, isAuthenticated, isRefreshing };
});
