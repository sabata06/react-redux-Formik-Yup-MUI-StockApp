import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getFirmsSuccess } from "../features/stockSlice";

const Firms = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const getFirms = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stock/firms/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log(data);
      dispatch(getFirmsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    getFirms();
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
