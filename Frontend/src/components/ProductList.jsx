import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import ProductCard from "./ProductCard";
import "../CSS/ProductCard.css";
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  //  This is fetch all products that shown below and inside products it store
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      {products && products.length > 0 ? (
        <div className="product-cards">
          {products.map((product) => (
            // This is the card and send props to another component that is productcard
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ProductList;
