import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import "../CSS/ProductDetail.css"; // Import CSS file for styling

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);
  // This button for handle the cart
  const handleAddToCart = () => {
    if (userInfo) {
      dispatch(addToCart({ productId: id, quantity: 1 }));
    } else {
      alert("Please login to add items to your cart.");
    }
  };

  if (loading)
    return <div className="product-detail-container">Loading...</div>;

  return (
    <div className="product-detail-container">
      {product && (
        <div className="product-details">
          <h2>{product.name}</h2>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: Rs.{product.price}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
