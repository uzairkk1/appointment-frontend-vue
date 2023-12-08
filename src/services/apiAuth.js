import axios from "../axios";

export async function login({ email, password }) {
  return await axios.post(
    `/users/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  //   return data;
}
export async function register({ name, email, password, confirmPassword }) {
  return await axios.post(
    `/users/auth/register`,
    {
      name,
      email,
      password,
      confirmPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  //   return data;
}
export async function refreshToken() {
  const { data } = await axios.get(`/users/auth/refresh`, {
    withCredentials: true,
  });
  return data;
}

export async function verifyEmail(token) {
  return axios.get(`users/auth/emailverification/${token}`);
}

export async function getCurrentUser() {
  let data = null;
  let userDetails = localStorage.getItem("user_details") || "";
  if (userDetails) userDetails = JSON.parse(userDetails);

  if (userDetails.accessToken && userDetails.user != undefined) {
    data = { user: userDetails.user };
  } else if (userDetails.accessToken && userDetails.user == undefined) {
    let { data: apiData } = await axios.get(`/auth/getCurrentUser`);

    data = apiData;
  } else {
    data = null;
  }

  return data;
}
