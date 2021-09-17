const { sign, verify } = require("jsonwebtoken");

module.exports = {
    isAuthorized: (req) => {
        const authorization = req.headers["accesstoken"];
        if (!authorization) {
          return null;
        }
        const token = authorization;
        try {
          return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
          return null;
        }
    },
};