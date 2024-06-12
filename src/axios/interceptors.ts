import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// let accessToken = null;

// export const setAccessToken = (token) => {
//   accessToken = token;
// };

axiosInstance.interceptors.request.use(
  (config) => {
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const response = await axiosInstance.post(
    //       "/auth/refresh-token",
    //       {},
    //       { withCredentials: true }
    //     );
    //     const { accessToken: newAccessToken } = response.data;
    //     setAccessToken(newAccessToken);
    //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //     return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     console.error("Token refresh error", refreshError);
    //     // Handle refresh token expiry (e.g., redirect to login)
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
