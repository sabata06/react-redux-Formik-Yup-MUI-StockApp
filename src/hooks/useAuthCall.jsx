// import axios from "axios";
// import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";

// // //? Bir hook sadece bir react component ve bir custom hook icersinde cagrilabilir. Bir Js fonksiyonu icerisinde hook cagiralamaz.

// export const login = async (userData) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const BASE_URL = "meyymetbaba.pythonanywhere.com";

//   dispatch(fetchStart());
//   try {
//     const { data } = await axios.post(
//       `${BASE_URL}/account/auth/login/`,
//       userData
//     );
//     dispatch(loginSuccess(data));
//     toastSuccessNotify("login islemi basarili");
//     navigate("/stock");
//   } catch (error) {
//     console.log(error);
//     dispatch(fetchFail());
//   }
// };

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

  const login = async (userData) => {
    // const BASE_URL = "https://meyymetbaba.pythonanywhere.com";

    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/account/auth/login/`,
        userData
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("login islemi basarili");
      navigate("/stock");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("login islemi basarisiz");
    }
  };
  const logout = async () => {
    // const BASE_URL = "https://meyymetbaba.pythonanywhere.com";

    dispatch(fetchStart());
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/account/auth/logout/`);
      dispatch(logoutSuccess());
      toastSuccessNotify("logout islemi basarili");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("logout islemi basarisiz");
    }
  };

  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/account/register/`,
        userData
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("register islemi basarili");
      navigate("/stock");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("kayıt islemi basarisiz");
    }
  };
  return { login, logout, register };
};

export default useAuthCall;
