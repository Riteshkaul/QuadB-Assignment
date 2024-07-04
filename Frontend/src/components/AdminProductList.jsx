import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../slices/productSlice";
import "../CSS/AdminProductList.css";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  // This is for the fetch all products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // this function for delete the products
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Product List</h2>
      <Link to="/admin/products/new">Add New Product</Link>
      <ul>
        {/* It show all the products for the user  */}
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
            {/* this edit button goes to different route and open new component */}
            <Link
              to={`/admin/products/edit/${product._id}`}
              className="link-button"
            >
              Edit
            </Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductList;
