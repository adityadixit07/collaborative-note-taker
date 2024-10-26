import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access." });
  }
};

export default authenticateUser;
