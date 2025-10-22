import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid token" });
    }
    console.log(decodedToken)
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "isAuth error" });
  }
};

export default isAuth;
