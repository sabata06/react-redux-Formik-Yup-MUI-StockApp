import {
  fetchFail,
  fetchStart,
  getStockSuccess,
  getProdCatBrandsSuccess,
} from "../features/stockSlice"
import { useDispatch } from "react-redux"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import useAxios from "./useAxios"

const useStockCall = () => {
  const dispatch = useDispatch()
  const { axiosWithToken } = useAxios()

  // Mevcut fonksiyonlar - korundu
  const getStockData = async (url) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken(`/stock/${url}/`)
      dispatch(getStockSuccess({ data, url }))
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const deleteStockData = async (url, id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`/stock/${url}/${id}/`)
      toastSuccessNotify(`${url} succesfuly deleted`)
      getStockData(url)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be deleted`)
      console.log(error)
    }
  }

  const postStockData = async (url, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`/stock/${url}/`, info)
      toastSuccessNotify(`${url} succesfuly posted`)
      getStockData(url)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be posted`)
      console.log(error)
    }
  }

  const putStockData = async (url, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`/stock/${url}/${info.id}/`, info)
      toastSuccessNotify(`${url} succesfuly updated`)
      getStockData(url)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be updated`)
      console.log(error)
    }
  }

  // ? Products, categories ve brands isteklerinin Promise.all ile es zamanli alinmasi.
  const getProdCatBrands = async () => {
    dispatch(fetchStart())
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ])

      dispatch(
        getProdCatBrandsSuccess([
          products?.data,
          categories?.data,
          brands?.data,
        ])
      )
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify(`Data can not be fetched`)
    }
  }

  // YENİ EKLENEN FONKSİYONLAR - Render API'ye uygun

  // Tüm ürünleri getir
  const getProducts = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get("/products/products/")
      dispatch(getStockSuccess({ data, url: "products" }))
      return data
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastErrorNotify("Ürünler getirilemedi")
    }
  }

  // Tüm kategorileri getir
  const getCategories = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get("/products/categories/")
      dispatch(getStockSuccess({ data, url: "categories" }))
      return data
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastErrorNotify("Kategoriler getirilemedi")
    }
  }

  // Tüm renkleri getir
  const getColors = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get("/products/colors/")
      dispatch(getStockSuccess({ data, url: "colors" }))
      return data
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastErrorNotify("Renkler getirilemedi")
    }
  }

  // Tüm bedenleri getir
  const getSizes = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get("/products/sizes/")
      dispatch(getStockSuccess({ data, url: "sizes" }))
      return data
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastErrorNotify("Bedenler getirilemedi")
    }
  }

  // Tüm ürün varyantlarını getir
  const getProductVariants = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get("/products/variants/")
      dispatch(getStockSuccess({ data, url: "variants" }))
      return data
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastErrorNotify("Ürün varyantları getirilemedi")
    }
  }

  // Promise.all ile tüm ürün verilerini getir
  const getAllProductData = async () => {
    dispatch(fetchStart())
    try {
      const [products, categories, colors, sizes, variants] = await Promise.all([
        axiosWithToken.get("/products/products/"),
        axiosWithToken.get("/products/categories/"),
        axiosWithToken.get("/products/colors/"),
        axiosWithToken.get("/products/sizes/"),
        axiosWithToken.get("/products/variants/")
      ])

      // Burada kendi redux state yapınıza göre dispatch yapabilirsiniz
      // Örnek olarak mevcut yapınızı kullanıyorum
      dispatch(
        getProdCatBrandsSuccess([
          products?.data,
          categories?.data,
          colors?.data,
          sizes?.data,
          variants?.data
        ])
      )
      
      return {
        products: products?.data,
        categories: categories?.data,
        colors: colors?.data,
        sizes: sizes?.data,
        variants: variants?.data
      }
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("Ürün verileri getirilemedi")
    }
  }

  return {
    // Mevcut fonksiyonlar
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProdCatBrands,
    
    // Yeni eklenen fonksiyonlar
    getProducts,
    getCategories,
    getColors,
    getSizes,
    getProductVariants,
    getAllProductData
  }
}

export default useStockCall