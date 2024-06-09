import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/FirmModal";

const Firms = () => {
  const { firms } = useSelector((state) => state.stock);
  const { getStockData } = useStockCall();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInfo({ name: "", phone: "", address: "", image: "" }), setOpen(false);
  };

  useEffect(() => {
    getStockData("firms");
  }, []);

  return (
    <div>
      <Typography variant="h4" color={"error"} mb={3}>
        Firms
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        NEW FIRM
      </Button>
      <FirmModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
      <Grid container justifyContent={"center"} spacing={2}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard
              firm={firm}
              handleOpen={handleOpen}
              info={info}
              setInfo={setInfo}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
