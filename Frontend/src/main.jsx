import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import AuthForm from "./components/AuthForm.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import AdminProductList from "./components/AdminProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";
import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Privacy from "./components/Privacy.jsx";

// This is router page and inside this there are children that show between the navbar and footer
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/login",
        element: <AuthForm />,
      },
      {
        path: "/admin/products",
        element: <AdminProductList />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/admin/products/new",
        element: <ProductForm />,
      },
      {
        path: "/admin/products/edit/:id",
        element: <ProductForm />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
    ],
  },
]);
// This store is for storing all the redux slices
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* This router Provider for routing */}
    <RouterProvider router={AppRouter} />
  </Provider>
);
