const jwt = require("jsonwebtoken");
const User = require("../models/user");

// This is the middlewhere it fetches tokem from authorization
//  and it identify the user is same or not
module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log(`Received token: ${token}`);

  if (!token) {
    console.log("Access denied. No token provided.");
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "Hellow");
    console.log(`Decoded token: ${JSON.stringify(decoded)}`);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found.");
      return res.status(404).send("User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).send("Invalid token.");
  }
};
