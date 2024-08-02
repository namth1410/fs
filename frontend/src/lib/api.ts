import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxios = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(new Error(error))
  );
};

export default axiosInstance;
