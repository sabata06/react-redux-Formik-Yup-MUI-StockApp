import axios from "axios";

export const login = async (userData) => {
  const BASE_URL = "https://meyymetbaba.pythonanywhere.com";
  try {
    const { data } = await axios.post(
      `${BASE_URL}/account/auth/login/`,
      userData
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
