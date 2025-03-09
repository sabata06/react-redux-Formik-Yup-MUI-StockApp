import { useSelector } from "react-redux";
import axios from "axios";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  // Render'daki backend URL'i
  const BASE_URL = "https://stock-tracking-app-backend.onrender.com/api";

  // Token formatını Bearer olarak değiştirdim (JWT için)
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const axiosPublic = axios.create({
    baseURL: BASE_URL,
  });

  // Token yenileme için interceptor ekleyelim
  axiosWithToken.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Eğer hata 401 ise ve daha önce token yenilemeyi denemediysek
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem("refresh");
          
          if (!refreshToken) {
            // Refresh token yoksa login sayfasına yönlendir
            window.location.href = "/login";
            return Promise.reject(error);
          }
          
          // Token yenileme isteği
          const response = await axios.post(`${BASE_URL}/accounts/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          
          // Yeni access token'ı kaydet
          localStorage.setItem("access", access);
          
          // Orijinal isteğin Authorization header'ını güncelle
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Orijinal isteği tekrar dene
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh token geçersizse, tüm token'ları temizle ve login'e yönlendir
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return { axiosWithToken, axiosPublic };
};

export default useAxios;