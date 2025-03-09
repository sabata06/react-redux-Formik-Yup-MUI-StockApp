import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux"
import useStockCall from "../hooks/useStockCall"
import ProductModal from "../components/ProductModal"
import ProductTable from "../components/ProductTable"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const Products = () => {
  // Eski ve yeni fonksiyonları kullan
  const { getStockData, getProdCatBrands, getProducts, getCategories, getAllProductData } = useStockCall()
  const { products, loading } = useSelector((state) => state.stock)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    // Render.com API'nize göre ürünleri getir
    getProducts()
    getCategories()
    
    // Alternatif olarak tüm verileri birden getir
    // getAllProductData()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div>
      <Typography variant="h4" color="primary" mb={3}>
        Ürünler
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        YENİ ÜRÜN EKLE
      </Button>

      <ProductModal open={open} handleClose={handleClose} />
      
      {products?.length > 0 ? (
        <ProductTable />
      ) : (
        <Typography variant="h6" color="textSecondary" sx={{ mt: 4, textAlign: 'center' }}>
          Henüz ürün bulunmamaktadır. Yeni ürün eklemek için yukarıdaki butonu kullanabilirsiniz.
        </Typography>
      )}
    </div>
  )
}

export default Products