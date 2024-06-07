import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stock/${url}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log(data);
      dispatch(getStockSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  return { getStockData };
};

export default useStockCall;
