import React from "react";
import "../CSS/ProductCard.css";
import { Link } from "react-router-dom";

//  This card is component to fetch all products it make cards
//  and reuse any where in another components
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <Link className="link" to={`/products/${product._id}`}>
          {product.name}
        </Link>

        <p>Price: Rs.{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard; // Ensure this line is present and correct
