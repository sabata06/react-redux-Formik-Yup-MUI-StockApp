import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
// import { fetchFail, fetchStart, getFirmsSuccess } from "../features/stockSlice";

const Firms = () => {
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  // const getFirms = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/stock/firms/`,
  //       {import useStockCall from './../hooks/useStockCall';

  //         headers: { Authorization: `Token ${token}` },
  //       }
  //     );
  //     console.log(data);
  //     dispatch(getFirmsSuccess(data));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };

  const { firms } = useSelector((state) => state.stock);
  const { getStockData } = useStockCall();

  useEffect(() => {
    getStockData("firms");
  }, []);

  return (
    <div>
      <Typography variant="h4" color={"error"} mb={3}>
        Firms
      </Typography>
      <Button variant="contained" color="primary">
        NEW FIRM
      </Button>
    </div>
  );
};

export default Firms;
