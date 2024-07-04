import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart as removeFromCartAction,
} from "../slices/cartSlice";
import "../CSS/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // remove product from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCartAction(productId)).then(() => {
      navigate("/cart");
    });
  };
  //  Calculate total price
  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => {
      const product = item.productId;
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {!cart.items || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.items.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div key={product._id} className="cart-item">
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  {product.image && (
                    <img src={product.image} alt={product.name} />
                  )}
                  <p>Price: {product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemoveFromCart(product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="cart-total">
            <h3>Total: Rs.{calculateTotalPrice().toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
