const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
} catch (error) {
    //   const token = req;
    //   console.log(token);
    return res.status(401).json({msg:"Auth failed"});
  }
};
