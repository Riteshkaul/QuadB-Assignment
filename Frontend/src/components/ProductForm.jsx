import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  fetchProduct,
  clearProduct,
} from "../slices/productSlice";
import "../CSS/ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    } else {
      // Clear product state if there is no id (new product)
      dispatch(clearProduct());
    }
  }, [dispatch, id]);

  // this  is for the add all the information from input
  useEffect(() => {
    if (id && product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setImage(product.image || "");
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
    }
  }, [product, id]);

  // This is when submit the information about the product and then navigate to the other component
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, description, price, image };
    if (id) {
      dispatch(updateProduct({ id, ...productData })).then(() =>
        navigate("/admin/products")
      );
    } else {
      dispatch(addProduct(productData)).then(() => navigate("/admin/products"));
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
