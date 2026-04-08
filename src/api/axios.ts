import axios from "axios";

const api = axios.create({
  baseURL: "https://life-os-backend-04e8.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ------------ REQUEST INTERCEPTOR ------------ */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ------------ RESPONSE INTERCEPTOR ------------ */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // remove token
      localStorage.removeItem("accessToken");

      // redirect to login
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default api;
