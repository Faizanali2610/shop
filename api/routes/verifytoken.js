
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenandAuthorization = (req, res, next) => {
  verifytoken(req, res, () => {
    if (!req.user) {
      return res.status(403).json("You are not allowed to access");
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to access");
    }
  });
};

const verifyTokenandAdmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (!req.user) {
      return res.status(403).json("You are not allowed to access");
    }
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to access");
    }
  });
};

module.exports = {
  verifytoken,
  verifyTokenandAuthorization,
  verifyTokenandAdmin,
};

