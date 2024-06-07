import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    loading: false,
    error: false,
    sales: [],
    purchases: [],
    brands: [],
    categories: [],
    products: [],
    firms: [],
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getStockSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.url] = payload.data;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    //? tüm action creator fonksiyonları getStockSuccess de toplandı
    // getFirmsSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.firms = payload;
    // },
    // getBrandsSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.brands = payload;
    // },
    // getSalesSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.sales = payload;
    // },
  },
});

export const { fetchStart, fetchFail, getStockSuccess } = stockSlice.actions;
export default stockSlice.reducer;
