import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import { btnStyle } from "../styles/globalStyles"
import useStockCall from "../hooks/useStockCall"

export default function ProductTable() {
  const { products } = useSelector((state) => state.stock)
  const { deleteStockData } = useStockCall()

  const columns = [
    {
      field: "id",
      headerName: "#",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Ürün Adı",
      flex: 2,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "category",
      headerName: "Kategori",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.row.category?.name || "",
    },
    {
      field: "barcode",
      headerName: "Barkod",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "brand",
      headerName: "Marka",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Cinsiyet",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        const genderMap = {
          "Male": "Erkek",
          "Female": "Kadın",
          "Unisex": "Unisex"
        };
        return genderMap[params.value] || params.value;
      }
    },
    {
      field: "description",
      headerName: "Açıklama",
      flex: 2,
      headerAlign: "center",
      align: "center",
      minWidth: 200,
      renderCell: (params) => (
        <div style={{ 
          whiteSpace: "normal", 
          lineHeight: "1.2", 
          padding: "8px 0" 
        }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Düzenle"
          sx={btnStyle}
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Sil"
          sx={btnStyle}
          onClick={() => deleteStockData("products", params.id)}
        />,
      ],
    },
  ]

  // Düzenleme işlevi - Modal açma işlemini daha sonra ekleyebilirsiniz
  const handleEdit = (id) => {
    console.log(`Ürün düzenleme id: ${id}`);
    // Burada düzenleme modal'ını açan bir fonksiyon çağırabilirsiniz
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
        autoHeight
        rows={products || []}
        columns={columns}
        pageSizeOptions={[20, 50, 75, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          boxShadow: 4,
          border: 1,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  )
}