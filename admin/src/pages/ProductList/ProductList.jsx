import React, { useEffect } from 'react'
import "./productList.css"
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { deleteProducts, getProducts } from '../../redux/apicalls';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products)

  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])
  
 const handleDelete = (id) => {
  deleteProducts(id, dispatch)
    .then(() => {
      getProducts(dispatch);
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
};


  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product-Name",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productListUser">
            {params.row.img && (
              <img className="productListImg" src={params.row.img} alt="" />
            )}
            {params.row.title && <span>{params.row.title}</span>}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineOutlined
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ]

  return (
  <div className="productList">
    <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
  </div>
  )
}

export default ProductList
