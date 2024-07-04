import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/auth";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  // when user click the logout button it logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container">
      {/* This show logo and side this user role */}
      <Link to="/" className="logoName link">
        MobStore {user ? `- (${user.role})` : "- Please Login"}
      </Link>
      <div className="list">
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          {/* This logic is written when usere is admin it show admin Products other wise it doesn't show to normal user */}
          {user && user.role === "admin" ? (
            <li>
              <Link className="link" to="/admin/products">
                Admin Products
              </Link>
            </li>
          ) : null}
          {user ? (
            <>
              <li>
                <Link className="link" to="/cart">
                  Cart - {cart.items.length} Items
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
