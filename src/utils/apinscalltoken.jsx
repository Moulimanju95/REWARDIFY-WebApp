
/* import axios from "axios";
import { BASE_URL } from "./api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  config.headers = {
    ...config.headers,
    Device: JSON.stringify({
      app: "mobile",
      os: "Android",
      device: "SM-A105F",
      device_type: "2",
      os_version: "9",
    }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  return config;
  console.log('Request headers:', {
    Authorization: `Bearer ${token}`
  });
}, Promise.reject);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          `${BASE_URL}/v1/store-user/auth/refreshToken/`,
          {},
          { headers: { "refresh-token": `Bearer ${refreshToken}` } }
        );
        localStorage.setItem("authToken", data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (e) {
        localStorage.removeItem("authToken");
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
 */

import axios from "axios";
import { BASE_URL } from "./api";

const api =axios.create(
    { 
         baseURL: BASE_URL,
    }
);

api.interceptors.request.use(
    (config)=>{
      config.headers.Device = JSON.stringify({
        app: "mobile",
        os: "Android",
        device: "SM-A105F",
        device_type: "2",
        ip_address: null,
        browser_version: "null",
        os_version: "9",
        browser: "null"
      });

      const token=localStorage.getItem('authToken');
       if(token){
        config.headers.Authorization=`Bearer ${token}`;
       }
       return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');
          try {
            const refresh = await axios.post(`${BASE_URL}/v1/store-user/auth/refreshToken/`,{},{headers:{ 'refresh-token': `Bearer ${refreshToken}`}});
            const newToken = refresh.data.token;
            localStorage.setItem('authToken', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (e) {
              console.error('Refresh token failed', e);
              localStorage.setItem('authToken','');
              return Promise.reject(e);
          }
      }
      return Promise.reject(error);
  }
);


export default api