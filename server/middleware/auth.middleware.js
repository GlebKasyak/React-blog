const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if(req.method === "OPTIONS") return next();

  try {
      //x_auth -- name of cookie
      //find token by name, because cookie value = user.token
      const token = req.cookies.x_auth;
      if(!token) {
          return res.status(401).json({ message: "No authorization" })
      }

      try {
          req.user = verify(token, "secret");
          next();
      } catch (err) {
          res.status(403).json({ message: "Error. Incorrect token key", err })
      }

  } catch (err) {
      res.status(401).json({ message: "No authorization", err })
  }
};