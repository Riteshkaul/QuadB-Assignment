import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../slices/auth";
import "../CSS/AuthForm.css";
const AuthForm = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  // It show  message when user is authenticate successfull
  useEffect(() => {
    if (userInfo) {
      setMessage("Authentication successful!");
    }
    if (error) {
      setMessage(error);
    }
  }, [userInfo, error]);

  //  This function is avoked when user click on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (isLogin) {
      dispatch(loginUser({ username, password }));
    } else {
      dispatch(registerUser({ username, password }));
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/*  This is when user is login it show register and vice versa */}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
        <p className="toggle-auth-mode" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Login"}
        </p>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AuthForm;
