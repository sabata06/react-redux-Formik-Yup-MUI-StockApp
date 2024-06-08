import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import FirmCard from "../components/FirmCard";

const Firms = () => {
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

      <Grid container justifyContent={"center"} spacing={2}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
