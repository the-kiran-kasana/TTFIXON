const jwt = require("jsonwebtoken");

/**
 * Verifies the JWT sent in the Authorization header (Bearer token)
 * and attaches the decoded payload to req.user.
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Restricts a route to the given roles. Use after authMiddleware.
 * e.g. authorizeRoles("admin", "superadmin")
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };
