import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`$/stock/${url}/`);
      console.log(data);
      dispatch(getStockSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/stock/${url}/${id}/`);
      toastSuccessNotify("silme islemi basarili");
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify("silme islemi basarisiz");
    }
  };

  return { getStockData, deleteStockData };
};

export default useStockCall;
