import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

const useAuthCall = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API'ye göre yolu değiştirdim - Render'daki backend URL'i
  const BASE_URL = "https://stock-tracking-app-backend.onrender.com/api";

  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      // Swagger'a göre /accounts/login/ endpoint'ini kullanıyoruz
      const { data } = await axios.post(
        `${BASE_URL}/accounts/login/`,
        userData
      );
      
      dispatch(loginSuccess(data));
      
      // JWT token'ları localStorage'a kaydetme
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      
      toastSuccessNotify("Giriş işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("Giriş işlemi başarısız");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // JWT kullandığınız için server-side logout gerekli olmayabilir
      // Sadece client-side token temizliği yeterli
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      
      dispatch(logoutSuccess());
      toastSuccessNotify("Çıkış işlemi başarılı");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarısız");
    }
  };

  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      // Swagger'a göre /accounts/register/ endpoint'ini kullanıyoruz
      const { data } = await axios.post(
        `${BASE_URL}/accounts/register/`,
        userData
      );
      
      // Kayıt işlemi sonrasında login olmak için token alıyorsak
      // burada loginSuccess dispatch etmek yerine
      // kayıt sonrası login sayfasına yönlendirme daha uygun olabilir
      // Ancak API'niz kayıt sonrası token döndürüyorsa:
      
      dispatch(registerSuccess(data));
      
      toastSuccessNotify("Kayıt işlemi başarılı");
      navigate("/login"); // veya doğrudan stock sayfasına gitmek için "/stock"
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("Kayıt işlemi başarısız");
    }
  };
  
  return { login, logout, register };
};

export default useAuthCall;